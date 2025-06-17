import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Table, Popup, TextInput, Button, AutoComplete } from "src/components";
import data from "./data.json";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Form, Formik } from "formik";
import { budgetValidationSchema } from "src/validations/budget";
import { useInitialValues } from "src/helpers/hooks";
import {
  Budget_List_Action,
  Update_Budget_Action,
  Create_Budget_Action,
  Soft_Delete_Action,
} from "src/redux/actions/Budget";
import { Category_List_Action } from "src/redux/actions/Categories";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "src/helpers/toaster";
// Constants for popup types
const POPUP_TYPES = {
  FORM: "form_popup",
  DELETE: "delete_popup",
};

const FORM_MODES = {
  ADD: "add",
  EDIT: "edit",
};

const Budget = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { budget_list, total } = useSelector((state) => state?.budget_list);
  const { category_list } = useSelector((state) => state?.categories_list);
  const [infoState, setInfoState] = useState({
    form_popup: {
      popup: false,
      data: {},
      mode: null,
    },
    delete_popup: {
      popup: false,
      data: {},
    },
    loader: {
      save_button: false,
    },
  });

  const initialValues = useInitialValues(data?.fields);

  useEffect(() => {
    dispatch(Budget_List_Action());
    dispatch(Category_List_Action());
  }, [dispatch]);

  const row_data = budget_list?.map((id) => {
    {
      return {
        ...id,
        category_name: category_list?.find((list) => list?.uid === id?.category)
          ?.category_name,
      };
    }
  });

  const category_options = category_list?.map((category) => {
    return {
      label: category?.category_name,
      value: category?.uid,
    };
  });

  const onClickRowEdit = useCallback((record) => {
    setInfoState((prev) => ({
      ...prev,
      form_popup: {
        popup: true,
        data: record,
        mode: FORM_MODES.EDIT,
      },
    }));
  }, []);

  const onClickAddNew = useCallback(() => {
    setInfoState((prev) => ({
      ...prev,
      form_popup: {
        popup: true,
        data: initialValues,
        mode: FORM_MODES.ADD,
      },
    }));
  }, [initialValues]);

  const handleDeletePopUp = useCallback((record) => {
    setInfoState((prev) => ({
      ...prev,
      delete_popup: {
        popup: true,
        data: {
          uid: record?.uid,
        },
      },
    }));
  }, []);

  const handleClosePopup = useCallback((key) => {
    setInfoState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        popup: false,
        data: {},
        ...(key === POPUP_TYPES.FORM && { mode: null }),
      },
    }));
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, save_button: true },
    }));
    const resetState = () => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, save_button: false },
        delete_popup: { popup: false, data: {} },
      }));
    };

    const handleResponse = (res) => {
      if (res.payload.code === 200) {
        toast.success(res?.payload?.message);
        dispatch(Budget_List_Action());
      } else {
        toast.error(res?.payload?.message);
      }
      resetState();
    };
    const uid = infoState.delete_popup.data?.uid;
    dispatch(Soft_Delete_Action(uid))
      .then(handleResponse)
      .catch((error) => {
        toast.error("Failed to create category");
        resetState();
      });
  }, [infoState.delete_popup.data]);

  const columns = useMemo(() => {
    if (!data?.table_header) return [];

    const cols = data.table_header.map((el) => ({
      title: el?.title,
      dataIndex: el?.dataIndex,
      key: el?.dataIndex,
    }));

    cols.push({
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-3">
          <TbEdit
            className="cursor-pointer "
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              onClickRowEdit(record);
            }}
          />
          <MdOutlineDeleteOutline
            className="cursor-pointer "
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePopUp(record);
            }}
          />
        </div>
      ),
    });

    return cols;
  }, [onClickRowEdit, handleDeletePopUp]);

  const handleSubmit = useCallback(
    (values) => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, save_button: true },
      }));

      const resetState = () => {
        setInfoState((prev) => ({
          ...prev,
          loader: { ...prev.loader, save_button: false },
          form_popup: { popup: false, data: {}, mode: null },
        }));
      };

      const handleResponse = (res) => {
        if (res.payload.code === 200) {
          toast.success(res?.payload?.message);
          dispatch(Budget_List_Action());
        } else {
          toast.error(res?.payload?.message);
        }
        resetState();
      };

      if (values?.uid) {
        const payload = {
          uid: values.uid,
          amount: values.amount,
        };

        dispatch(Update_Budget_Action(payload))
          .then(handleResponse)
          .catch((error) => {
            console.error("Update failed:", error);
            toast.error("Failed to update category");
            resetState();
          });
      } else {
        // Add new category
        dispatch(Create_Budget_Action(values))
          .then(handleResponse)
          .catch((error) => {
            toast.error("Failed to create category");
            resetState();
          });
      }
    },
    [dispatch]
  ); // Added dispatch to dependency array

  const getFormInitialValues = useCallback(() => {
    const { mode, data } = infoState.form_popup;

    if (mode === FORM_MODES.EDIT) {
      return {
        ...initialValues,
        ...data,
      };
    }

    return initialValues;
  }, [initialValues, infoState.form_popup]);

  const getPopupTitle = useCallback(() => {
    const { mode } = infoState.form_popup;
    return mode === FORM_MODES.EDIT
      ? "Edit Budget Entry"
      : "Add New Budget Entry";
  }, [infoState.form_popup.mode]);

  const renderFormFields = useCallback(
    (formikProps) => {
      const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      } = formikProps;

      return data?.fields?.map((field, index) => {
        const commonProps = {
          name: field?.name,
          label: field?.label,
          placeholder: field?.label,
          showAsterisk: field?.showAsterisk,
          error: touched[field?.name] && errors[field?.name],
        };

        const options =
          field?.options === "category_options" ? category_options : field?.options;

        switch (field?.field) {
          case "textInput":
            return (
              <TextInput
                key={index}
                {...commonProps}
                type={field?.type}
                value={values[field?.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            );

          case "auto_complete":
            return (
              <AutoComplete
              key={index} 
                {...commonProps}
                options={options}
                value={values[field?.name]}
                onChange={(_, options) => {
                  setFieldValue(field?.name, options?.value);
                }}
                onBlur={handleBlur}
              />
            );

          case "button":
            return (
              <div key={index} className="budget_auth_btn_section mt-4">
                <Button
                  textContent={field?.textContent}
                  className={field?.class}
                  type={field?.type}
                  isLoading={infoState?.loader?.save_button}
                />
              </div>
            );

          default:
            return null;
        }
      });
    },
    [infoState?.loader?.save_button]
  );

  return (
    <>
      <Table
        dataSource={row_data || []}
        columns={columns}
        hidePagination={true}
        onAddNew={onClickAddNew}
      />

      {/* Form Popup (Add/Edit) */}
      {infoState?.form_popup?.popup && (
        <Popup
          open={infoState?.form_popup?.popup}
          onClose={() => handleClosePopup(POPUP_TYPES.FORM)}
          title={getPopupTitle()}
        >
          <div className="col-span-6 flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
              <Formik
                initialValues={getFormInitialValues()}
                validationSchema={budgetValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {(formikProps) => <Form>{renderFormFields(formikProps)}</Form>}
              </Formik>
            </div>
          </div>
        </Popup>
      )}

      {/* Delete Confirmation Popup */}
      {infoState?.delete_popup?.popup && (
        <Popup
          open={infoState?.delete_popup?.popup}
          onClose={() => handleClosePopup(POPUP_TYPES.DELETE)}
          title="Confirm Delete"
        >
          <div className="p-6 text-center">
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete this budget entry?
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                textContent="Cancel"
                variant="secondary"
                onClick={() => handleClosePopup(POPUP_TYPES.DELETE)}
              />
              <Button
                textContent="Delete"
                className="btn-danger"
                onClick={handleConfirmDelete}
                isLoading={infoState?.loader?.save_button}
              />
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default Budget;

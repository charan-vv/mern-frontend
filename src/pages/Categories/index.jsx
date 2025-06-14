import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  Table,
  Popup,
  TextInput,
  Button,
  AutoComplete,
  DatePicker,
} from "src/components";
import data from "./data.json";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Form, Formik } from "formik";
import { categoriesValidationSchema } from "src/validations/categories";
import { useInitialValues } from "src/helpers/hooks";
import { Category_List_Action, Update_Category_Action,Create_Category_Action,Soft_Delete_Action } from "src/redux/actions/Categories";
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

const Categories = () => {
  const dispatch = useDispatch();
  const toast =useToast();
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
      dispatch(Category_List_Action())
    }, []);

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
          uid:record?.uid
         
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
      dispatch(Category_List_Action());
    } else {
      toast.error(res?.payload?.message);
    }
    resetState();
  };
    const uid=infoState.delete_popup.data?.uid
     dispatch(Soft_Delete_Action(uid))
      .then(handleResponse)
      .catch((error) => {
        toast.error('Failed to create category');
        resetState();
      });
   
  }, [infoState.delete_popup.data]);

  const columns = useMemo(() => {
    if (!data?.table_header) return [];

    const cols = data?.table_header?.map((el) => ({
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

const handleSubmit = useCallback((values) => {
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
      dispatch(Category_List_Action());
    } else {
      toast.error(res?.payload?.message);
    }
    resetState();
  };

  if (values?.uid) {
    // Edit existing category
    const payload = {
      uid: values.uid,
      category_name: values.category_name
    };
    dispatch(Update_Category_Action(payload))
      .then(handleResponse)
      .catch((error) => {
        console.error('Update failed:', error);
        toast.error('Failed to update category');
        resetState();
      });
  } else {
    // Add new category
    dispatch(Create_Category_Action(values))
      .then(handleResponse)
      .catch((error) => {
        toast.error('Failed to create category');
        resetState();
      });
  }
}, [dispatch]); // Added dispatch to dependency array

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
      ? "Edit Category Entry"
      : "Add New Category Entry";
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
          key: index,
          name: field?.name,
          label: field?.label,
          placeholder: field?.label,
          showAsterisk: field?.showAsterisk,
        };

        switch (field?.field) {
          case "date_picker":
            return (
              <DatePicker
                label={field?.label}
                showAsterisk={field?.showAsterisk}
                error={[field?.name] && errors[field?.name]}
                value={values[field?.name]}
                onChange={(date, dateString) => {
                  setFieldValue(field?.name, dateString);
                  setFieldTouched(field?.name, true);
                }}
                onBlur={() => setFieldTouched(field?.name, true)}
              />
            );
          case "textInput":
            return (
              <TextInput
                {...commonProps}
                type={field?.type}
                value={values[field?.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={[field?.name] && errors[field?.name]}
              />
            );

          case "auto_complete":
            return (
              <AutoComplete
                {...commonProps}
                options={field?.options}
                value={values[field?.name]}
                onChange={(_, options) => {
                  setFieldValue(field?.name, options?.value);
                }}
                onBlur={handleBlur}
                error={[field?.name] && errors[field?.name]}
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
        dataSource={category_list|| []}
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
                validationSchema={categoriesValidationSchema}
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
              Are you sure you want to delete this Category entry?
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

export default Categories;

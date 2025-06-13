import React, { useMemo, useState, useCallback } from "react";
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
import { transationsValidationSchema } from "src/validations/transcations";
import { useInitialValues } from "src/helpers/hooks";
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
          amount: record?.amount,
          category: record?.category,
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
    // Add your delete logic here
    console.log("Deleting:", infoState.delete_popup.data);

    setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, save_button: true },
    }));

    // Simulate API call
    setTimeout(() => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, save_button: false },
        delete_popup: { popup: false, data: {} },
      }));
    }, 1000);
  }, [infoState.delete_popup.data]);

  const columns = useMemo(() => {
    if (!data?.table_head) return [];

    const cols = data?.table_head?.map((el) => ({
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

    // Add your save logic here
    console.log("Submitting values:", values);

    // Simulate API call
    setTimeout(() => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, save_button: false },
        form_popup: { popup: false, data: {}, mode: null },
      }));
    }, 1000);
  }, []);

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
        dataSource={data?.table_row || []}
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
                validationSchema={transationsValidationSchema}
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
              Are you sure you want to delete this Transcation entry?
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

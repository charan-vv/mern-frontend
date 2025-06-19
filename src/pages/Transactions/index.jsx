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
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Form, Formik } from "formik";
import { transationsValidationSchema } from "src/validations/transcations";
import { useInitialValues } from "src/helpers/hooks";
import { useDispatch, useSelector } from "react-redux";
import { 
  Transaction_List_Action,
  Create_Transaction_Action,
  Update_Transaction_Action,
  Soft_Delete_Action 
} from "src/redux/actions/Transactions";
import { Category_List_Action } from "src/redux/actions/Categories";
import { useToast } from "src/helpers/toaster";

const POPUP_TYPES = {
  FORM: "form_popup",
  DELETE: "delete_popup",
};

const FORM_MODES = {
  ADD: "add",
  EDIT: "edit",
};

const Transactions = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { transaction_list, total } = useSelector((state) => state?.transaction_list);
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




  const row_data = transaction_list?.map((id) => {
    return {
      ...id,
      date: id?.date.split("T")[0],
      category_name: category_list?.find((list) => list?.uid === id?.category)
        ?.category_name,
    };
  });




  const category_options = category_list?.map((category) => {
    return { 
      label: category?.category_name, 
      value: category?.uid 
    };
  });




  useEffect(() => {
    dispatch(Transaction_List_Action());
    dispatch(Category_List_Action());
  }, [dispatch]);




  // Inline editing state and handlers
  const [editingKey, setEditingKey] = useState("");
  const [editForm, setEditForm] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);





  const handleStartEdit = useCallback((record) => {
    setEditingKey(record.uid);
    setEditForm({ ...record });
  }, []);




  
  const handleCancelEdit = useCallback(() => {
    setEditingKey("");
    setEditForm({});
  }, []);





  const handleFieldChange = useCallback((field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  

  const handleSaveEdit = useCallback(async () => {
    try {
      setSaveLoading(true);
      
      const payload = {
        uid: editForm.uid,
        date: editForm.date,
        type: editForm.type,
        category: editForm.category,
        item: editForm.item,
        amount: editForm.amount
      };

      const res = await dispatch(Update_Transaction_Action(payload));
      
      if (res.payload.code === 200) {
        toast.success(res?.payload?.message);
        dispatch(Transaction_List_Action());
        setEditingKey("");
        setEditForm({});
      } else {
        toast.error(res?.payload?.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update Transaction");
    } finally {
      setSaveLoading(false);
    }
  }, [editForm, dispatch, toast]);





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
          uid: record?.uid
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
        dispatch(Transaction_List_Action());
      } else {
        toast.error(res?.payload?.message);
      }
      resetState();
    };
    
    const uid = infoState.delete_popup.data?.uid;
    dispatch(Soft_Delete_Action(uid))
      .then(handleResponse)
      .catch((error) => {
        toast.error("Failed to delete transaction");
        resetState();
      });
  }, [infoState.delete_popup.data, dispatch, toast]);





  // Modified columns to support inline editing
  const columns = useMemo(() => {

    const columnWidths = {
      date: 130,
      item: 200,
      type: 120,
      category_name: 160,
      amount: 100,
    };

     const cols = data?.table_header?.map((el) => ({
      title: el?.title,
      dataIndex: el?.dataIndex,
      width: columnWidths[el?.dataIndex] || 150,
      key: el?.dataIndex,
      editable: true,
      inputType: el?.dataIndex === 'amount' ? 'number' : 'text',

      render: (text, record) => {
        const isEditing = record.uid === editingKey;
        if (!isEditing ) {
          return text;
        }

        const currentRecord =  editForm;
        const handleChange = (field, value) => 
          handleFieldChange(field, value,);

        
        // Render edit input using the same components as in the form
        if (el?.dataIndex === 'category_name') {
          return (
            <AutoComplete
              options={category_options}
              value={currentRecord[el.dataIndex] || ''}
              onChange={(_, option) => handleChange('category_name', option?.value)}
              placeholder="Select Category"
            />
          );
        } else if (el?.dataIndex === 'date') {
          return (
            <DatePicker
              value={currentRecord[el.dataIndex] || ''}
              onChange={(date, dateString) => handleChange(el.dataIndex, dateString)}
              // className="w-full p-1"
            />
          );
        } else if (el?.dataIndex === 'type') {
          return (
            <AutoComplete
              options={[
                { label: "Income", value: "income" },
                { label: "Expense", value: "expense" }
              ]}
              value={currentRecord[el.dataIndex] || ''}
              onChange={(_, option) => handleChange(el.dataIndex, option?.value)}
              placeholder="Select Type"
            
            />
          );
        } else {
          return (
            <TextInput
              type={el?.dataIndex === 'amount' ? 'number' : 'text'}
              value={currentRecord[el.dataIndex] || ''}
              onChange={(e) => handleChange(el.dataIndex, e.target.value)}
            />
          );
        }
      }
    }));

    
    cols.push({
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 140,
      render: (_, record) => {
        const isEditing = record.uid === editingKey;
        // const isNew = isAddingNew && !record.uid;
        
        return (
          <div className="flex gap-2">
            {isEditing  ? (
              <>
                <TiTick
                  className="cursor-pointer "
                  size={18}
                  onClick={(e) => {
                    e.stopPropagation();
                    // isNew ? handleSaveNew() : 
                    handleSaveEdit();
                  }}
                  disabled={saveLoading}
                />
                <RxCross2
                  className="cursor-pointer "
                  size={18}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelEdit();
                  }}
                  disabled={saveLoading}
                />
              </>
            ) : (
              <>
                <TbEdit
                  className="cursor-pointer "
                  size={18}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartEdit(record);
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
              </>
            )}
          </div>
        );
      },
    });

    return cols;
  }, [editingKey, editForm, saveLoading, category_options, handleStartEdit, handleCancelEdit, handleSaveEdit, handleFieldChange, handleDeletePopUp]);





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
          dispatch(Transaction_List_Action());
        } else {
          toast.error(res?.payload?.message);
        }
        resetState();
      };

      // Only handle ADD mode since EDIT is now inline
      dispatch(Create_Transaction_Action(values))
        .then(handleResponse)
        .catch((error) => {
          toast.error("Failed to create Transaction");
          resetState();
        });
    },
    [dispatch, toast]
  );





  const getFormInitialValues = useCallback(() => {
    return initialValues;
  }, [initialValues]);





  const getPopupTitle = useCallback(() => {
    return "Add New Transaction Entry";
  }, []);





  const renderFormFields = useCallback(
    (formikProps) => {
      const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
      } = formikProps;

      return data?.fields?.map((field, index) => {
        const commonProps = {
          key: index,
          name: field?.name,
          label: field?.label,
          placeholder: field?.label,
          showAsterisk: field?.showAsterisk,
        };
        
        const options =
          field?.options === "category_options" ? category_options : field?.options;

        switch (field?.field) {
          case "date_picker":
            return (
              <DatePicker
                label={field?.label}
                showAsterisk={field?.showAsterisk}
                error={touched[field?.name] && errors[field?.name]}
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
                error={touched[field?.name] && errors[field?.name]}
              />
            );

          case "auto_complete":
            return (
              <AutoComplete
                {...commonProps}
                options={options}
                value={values[field?.name]}
                onChange={(_, options) => {
                  setFieldValue(field?.name, options?.value);
                }}
                onBlur={handleBlur}
                error={touched[field?.name] && errors[field?.name]}
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
    [infoState?.loader?.save_button, category_options]
  );

  return (
    <>
      <Table
        dataSource={row_data || []}
        columns={columns}
        hidePagination={true}
        onAddNew={onClickAddNew}
      />

      {/* Form Popup (Add Only) */}
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
              Are you sure you want to delete this Transaction entry?
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

export default Transactions;


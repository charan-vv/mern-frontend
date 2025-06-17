import React, { useCallback, useState,useRef } from "react";
import { useInitialValues } from "src/helpers/hooks";
import data from "./data.json";
import { bankValidationSchema } from "src/validations/settings";
import { AutoComplete, Button, TextInput } from "src/components";
import { Formik, Form, FieldArray } from "formik";
import { MdDelete } from "react-icons/md";
import "./style.scss";

const Index = () => {
  const initialAccount = useInitialValues(data?.account_details);
  const formik_ref=useRef()
  const [infoState, setInfoState] = useState({
    loader: {
      save_button: false,
    },
  });

  const account_options = [
    { label: "Savings", value: "savings" },
    { label: "Current", value: "current" },
  ];

  const handleSubmit = (values) => {
    console.log(values, "submitted values");
  };

  const renderFormFields = useCallback(
    (formikProps, index) => {
      const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      } = formikProps;

      return data?.account_details?.map((field, fieldIndex) => {
        const fieldName = `account_details[${index}].${field.name}`;
        const commonProps = {
          name: fieldName,
          label: field.label,
          placeholder: field.label,
          showAsterisk: field.showAsterisk,
          error:
            touched?.account_details?.[index]?.[field.name] &&
            errors?.account_details?.[index]?.[field.name],
        };

        const options =
          field?.options === "account_type" ? account_options : field?.options;

        switch (field.field) {
          case "textInput":
            return (
              <TextInput
                key={fieldIndex}
                {...commonProps}
                type={field?.type}
                value={values.account_details?.[index]?.[field.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            );
          case "auto_complete":
            return (
              <AutoComplete
                key={fieldIndex}
                {...commonProps}
                options={options}
                value={values.account_details?.[index]?.[field.name]}
                onChange={(_, option) => {
                  setFieldValue(fieldName, option?.value);
                }}
                onBlur={handleBlur}
              />
            );
          default:
            return null;
        }
      });
    },
    [infoState?.loader?.save_button]
  );



  return (
    <div className="bg-white p-5">
      <Formik
        initialValues={{ account_details: [initialAccount] }}
        validationSchema={bankValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        innerRef={formik_ref}
      >
        {(formikProps) => (
          <>
            <Form>
             
                <h2 className="text-2xl font-bold ">Bank Details</h2>
                
         
              <FieldArray
                name="account_details"
                render={(arrayHelpers) => (
                  <>
                    <div className="scrollable-form-section">
                      {formikProps?.values?.account_details?.map((_, index) => (
                        <>
                          <div className="flex justify-end">
                            <div className="add_new_block">
                             {index>0 && (
                              <>
                               <MdDelete
                                className="budget_icons"
                                onClick={() => arrayHelpers.remove(index)}
                              />
                              </>
                             )}
                            </div>
                          </div>
                          <div
                            key={index}
                            className=" grid grid-cols-1 sm:grid-cols-2 gap-4   p-4 mb-4 rounded "
                          >
                            {renderFormFields(formikProps, index)}
                       
                          </div>
                        </>
                      ))}
                    </div>

                    <div className="add_new_block">
                      <span onClick={() => arrayHelpers.push(initialAccount)}>
                        +Add New
                      </span>
                    </div>
                  </>
                )}
              />

              <div className="budget_auth_btn_section sticky-footer">
                <Button
                  textContent={"Save"}
                  className={"budget_auth_btn"}
                  type={"submit"}
                  isLoading={infoState?.loader?.save_button}
                />
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Index;

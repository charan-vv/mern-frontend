import React, { useCallback, useState, useRef } from "react";
import { useInitialValues } from "src/helpers/hooks";
import data from "./data.json";
import { cardValidationSchema } from "src/validations/settings";
import { AutoComplete, Button, TextInput, DatePicker } from "src/components";
import { Formik, Form, FieldArray } from "formik";
import { MdDelete } from "react-icons/md";
import "../BankDetails/style.scss";

const Index = () => {
  const initialAccount = useInitialValues(data?.card_details);
  const formik_ref = useRef();
  const [infoState, setInfoState] = useState({
    loader: {
      save_button: false,
    },
  });

  const card_options = [
    { label: "Debit", value: "debit" },
    { label: "Credit", value: "credit" },
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

      return data?.card_details?.map((field, fieldIndex) => {
        const fieldName = `card_details[${index}].${field.name}`;
        const commonProps = {
          name: fieldName,
          label: field.label,
          placeholder: field.label,
          showAsterisk: field.showAsterisk,
          error:
            touched?.card_details?.[index]?.[field.name] &&
            errors?.card_details?.[index]?.[field.name],
        };

        const options =
          field?.options === "card_options" ? card_options : field?.options;

        switch (field.field) {
          case "textInput":
            return (
              <TextInput
                key={fieldIndex}
                {...commonProps}
                type={field?.type}
                value={values.card_details?.[index]?.[field.name] || ""}
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
                value={values.card_details?.[index]?.[field.name]}
                onChange={(_, option) => {
                  setFieldValue(fieldName, option?.value);
                }}
                onBlur={handleBlur}
              />
            );
          case "datePicker":
            return (
              <DatePicker
                key={fieldIndex}
                {...commonProps}
                value={values.card_details?.[index]?.[field.name]}
                onChange={(date, dateString) => {
                  setFieldValue(fieldName, dateString);
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
        initialValues={{ card_details: [initialAccount] }}
        validationSchema={cardValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        innerRef={formik_ref}
      >
        {(formikProps) => (
          <>
            <Form>
              <h2 className="text-2xl font-bold ">Card Details</h2>

              <FieldArray
                name="card_details"
                render={(arrayHelpers) => (
                  <>
                    <div className="scrollable-form-section bg-[#f8f9fa] rounded">
                      {formikProps?.values?.card_details?.map((_, index) => (
                        <>
                          <div className="flex justify-end">
                            <div className="add_new_block">
                              {index > 0 && (
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

              <div className="flex justify-end sticky-footer">
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

import { Formik, Form } from "formik";
import React, { useState } from "react";
import { RegisterImg } from "../../../config";
import { TextInput, Button, OtpInput, Popup } from "../../../components";
import { forgetPasswordValidationSchema } from "../../../validations/auth";
import fields from "../login.json";
import "../style.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [infoState, setInfoState] = useState({
    message: {
      success: { popup: false, message: "" },
      failure: { popup: false, message: "" },
    },
    loader: { submit_button: false },
    otp: {
      popup: false,
      data: {},
      otp_value: "",
      errors: {},
      show_password_input:false,
    },
  });

  const navigate = useNavigate();

  const handleClosePopup = () => {
    setInfoState((prev) => ({
      ...prev,
      otp: {
        ...prev?.otp,
        popup: false,
        otp_value: "",
      },
    }));
  };

  const handlePopupOpen = (values) => {
    setInfoState((prev) => ({
      ...prev,
      otp: {
        ...prev?.otp,
        popup: true,
        data: values,
      },
    }));
  };

  const handleOtpChange = (value) => {
    setInfoState((prev) => ({
      ...prev,
      otp: {
        ...prev?.otp,
        otp_value: value,
      },
    }));
  };

  const initialValues = {
    ...fields?.forgot_password?.reduce((acc, field) => {
      if (field.name) acc[field.name] = "";
      return acc;
    }, {}),
    role: "web",
  };

  const handleSubmit = () => {
    setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, submit_button: true },
    }));
    console.log(infoState?.otp, "payload");
    setTimeout(() => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, submit_button: false },
      }));
    }, 1500);
  };

  return (
    <>
      <div className="grid grid-cols-12">
        {/* Image Section */}
        <div className="col-span-6 flex items-center justify-center budget_auth_img_section">
          <RegisterImg className="h-[633px]" />
        </div>

        {/* Login Form Section */}
        <div className="col-span-6 flex items-center justify-center bg-white">
          <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
            <Formik initialValues={initialValues}validationSchema={forgetPasswordValidationSchema}onSubmit={handlePopupOpen}>
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
                  {fields?.forgot_password?.map((field, index) => {
                    if (field?.field === "textInput" ||field?.field === "password") {
                      return (<TextInput key={index}name={field?.name}type={field?.type}label={field?.label}value={values[field?.name]}onChange={handleChange}onBlur={handleBlur}placeholder={field?.label}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>);
                    }
                    if (field?.field === "button") {
                      return (<div key={index} className="budget_auth_btn_section mt-2"><Button variant={field?.variant}textContent={field?.textContent}className={field?.class}type={field?.type}/></div>);
                    }
                    return null;
                  })}
                  <div className="text-end underline mt-4 cursor_pointer"onClick={() => navigate(-1)}>Go back</div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* popup */}

      {infoState?.otp?.popup && (
        <Popup open={infoState?.otp?.popup}onClose={() => handleClosePopup()}title={`${fields?.forgot_password_popup?.popupTitle} ${infoState?.otp?.data?.email_id}`}width={550}>
          {fields?.forgot_password_popup?.fields?.map((field, index) => {
            if (field?.field === "otp") {
              return (<OtpInput key={index}name={field?.field}value={infoState?.otp?.otp_value}onChange={handleOtpChange}length={field?.length}showAsterisk={field?.showAsterisk}error={infoState?.otp?.errors?.[field?.field]}/>);
            }
            if (field?.field === "button") {
              return (<div key={index} className="flex justify-center budget_auth_btn_section mt-2">
                            <Button variant={field?.variant}textContent={field?.textContent}className={field?.class}type={field?.type}onClick={() => {handleSubmit();}}isLoading={infoState?.loader?.submit_button}/>
                      </div>)}
          })}
        </Popup>
      )}
    </>
  );
};

export default Register;

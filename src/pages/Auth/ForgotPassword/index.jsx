import { Formik, Form } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../helpers/toaster";
import { useDispatch } from "react-redux";
import { ForgotPasswordImg } from "../../../config";
import { TextInput, Button, OtpInput, Popup } from "../../../components";
import { forgetPasswordValidationSchema } from "../../../validations/auth";
import {
  GetOtpAction,
  VerifyOtpAction,
  ResetPasswordAction,
} from "../../../redux/actions/auth";
import { formatTimer } from "../../../helpers/hooks";
import fields from "../login.json";
import "../style.scss";

const passHint = [
  {
    key: "minLength",
    text: "Min 8 Characters",
    isValid: (password) => password.length >= 8,
  },
  {
    key: "upperLower",
    text: "1 Upper & Lower case",
    isValid: (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
  {
    key: "number",
    text: "1 Number",
    isValid: (password) => /\d/.test(password),
  },
  {
    key: "specialChar",
    text: "1 Special Char",
    isValid: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const formikRef = useRef();

  const [infoState, setInfoState] = useState({
    message: {
      success: { popup: false, message: "" },
      failure: { popup: false, message: "" },
    },
    loader: {
      otp_verified_otp: false,
      get_otp_button: false,
      submit_button: false,
    },
    otp: {
      popup: false,
      data: {},
      otp_value: "",
      errors: {},
      show_password_input: false,
      password: "",
      timer: 120,
    },
    password_validation: {
      minLength: false,
      upperLower: false,
      number: false,
      specialChar: false,
    },
  });

  // Define initial values outside of component scope
  const initialValues = {
    ...fields?.forgot_password?.reduce((acc, field) => {
      if (field.name) acc[field.name] = "";
      return acc;
    }, {}),
  };

  const handleClosePopup = () => {
    setInfoState((prev) => ({
      ...prev,
      otp: {
        ...prev.otp,
        popup: false,
        otp_value: "",
        errors: {},
        password: "",
        show_password_input: false,
        timer: 120, // Reset timer
      },
    }));

    // Reset the Formik form to its initial state
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  };

  const handlePopupOpen = (values) => {
    setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, get_otp_button: true },
    }));

    const payload = {
      email_id: formikRef?.current?.values?.email_id,
    };

    dispatch(GetOtpAction(payload)).then((res) => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, get_otp_button: false },
      }));
      if (res?.payload?.code === 200) {
        const data = {
          ...values,
          uid: res?.payload?.data?.uid,
        };
        toast.success(res?.payload?.message);
        setInfoState((prev) => ({
          ...prev,
          otp: {
            ...prev.otp,
            popup: true,
            otp_value: "",
            data: data,
            timer: 120, // Reset timer when opening popup
          },
          password_validation: {
            ...prev?.password_validation,
            minLength: false,
            upperLower: false,
            number: false,
            specialChar: false,
          },
        }));
      } else {
        toast.error(res?.payload?.message);
      }
    });
  };

  const handleOtpChange = (value) => {
    setInfoState((prev) => ({
      ...prev,
      otp: { ...prev.otp, otp_value: value },
    }));
  };

  const handleOtpSubmit = () => {
    const { otp_value } = infoState.otp;
    if (otp_value.length !== 6) {
      setInfoState((prev) => ({
        ...prev,
        otp: {
          ...prev.otp,
          errors: { otp: "Enter valid 6-digit OTP" },
        },
      }));
      return;
    }

    const payload = {
      email_id: formikRef?.current?.values?.email_id,
      otp: otp_value,
    };

    setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, otp_verified_otp: true },
    }));
    dispatch(VerifyOtpAction(payload)).then((res) => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, otp_verified_otp: false },
      }));
 
      if (res?.payload?.code === 200) {
        toast.success(res?.payload?.message);
        setInfoState((prev) => ({
          ...prev,
          otp: {
            ...prev.otp,
            errors: {},
            show_password_input: true,
          },
        }));
      } else {
        toast.error(res?.payload?.message);
      }
    });
    // OTP is valid
  };

  const passwordChecker = (el) => {
    const { name, value } = el.target;
    setInfoState((prev) => ({
      ...prev,
      otp: {
        ...prev.otp,
        [name]: value,
      },
    }));
    setInfoState((prev) => ({
      ...prev,
      password_validation: {
        ...prev?.password_validation,
        minLength: value.length >= 8,
        upperLower: /[a-z]/.test(value) && /[A-Z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      },
    }));
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (
      infoState.otp.popup &&
      !infoState.otp.show_password_input &&
      infoState.otp.timer > 0
    ) {
      interval = setInterval(() => {
        setInfoState((prev) => ({
          ...prev,
          otp: {
            ...prev.otp,
            timer: prev.otp.timer - 1,
          },
        }));
      }, 1000);
    } else if (infoState.otp.timer === 0) {
      clearInterval(interval);
      setInfoState((prev)=>({
        ...prev,
        otp:{
          ...prev?.otp,
           otp_value:""
        }
      }))
    }
    return () => clearInterval(interval);
  }, [
    infoState.otp.popup,
    infoState.otp.show_password_input,
    infoState.otp.timer,
  ]);



  const handleSubmitPassword = () => {
    const { password } = infoState.otp;
    if (!password) {
      setInfoState((prev) => ({
        ...prev,
        otp: {
          ...prev.otp,
          errors: { password: "Password is required" },
        },
      }));
      return;
    }
    const { password_validation } = infoState;
    const allValid = Object?.values(password_validation)?.every(
      (val) => val === true
    );
    if (!allValid) {
      toast.error(
        "Invalid password format. Please follow the required pattern "
      );
      return;
    }

    setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, submit_button: true },
    }));


     const payload={
      uid:infoState?.otp?.data?.uid,
      password: infoState.otp.password,
     }
     dispatch(ResetPasswordAction(payload)).then((res)=>{
      setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, submit_button: false },
    }));

      if(res?.payload?.code===200){
        toast.success(res?.payload?.message)
        navigate(-1)
      }else{
        toast.error(res?.payload?.message)
      }
     })
    // Simulate API call
    // setTimeout(() => {
     
      // setInfoState((prev) => ({
      //   ...prev,
      //   loader: { ...prev.loader, submit_button: false },
      //   otp: {
      //     ...prev.otp,
      //     popup: false,
      //     otp_value: "",
      //     password: "",
      //     show_password_input: false,
      //     timer: 120, // Reset timer
      //   },
      // }));
      // navigate(-1);
      // // Reset the Formik form after successful password submission
      // if (formikRef.current) {
      //   formikRef.current.resetForm();
      // }
    // }, 1500);
  };

  return (
    <>
      <div className="grid grid-cols-12">
        {/* Image Section */}
        <div className="col-span-6 flex items-center justify-center budget_auth_img_section">
          <ForgotPasswordImg className="h-[633px]" />
        </div>

        {/* Form Section */}
        <div className="col-span-6 flex items-center justify-center bg-white">
          <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              validationSchema={forgetPasswordValidationSchema}
              onSubmit={handlePopupOpen}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
                  {fields?.forgot_password?.map((field, index) => {
                    if (["textInput", "password"]?.includes(field?.field)) {
                      return (
                        <TextInput
                          key={index}
                          name={field?.name}
                          type={field?.type}
                          label={field?.label}
                          value={values[field?.name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={field?.label}
                          showAsterisk={field?.showAsterisk}
                          error={touched[field?.name] && errors[field?.name]}
                        />
                      );
                    }

                    if (field?.field === "button") {
                      return (
                        <div
                          key={index}
                          className="budget_auth_btn_section  mt-2"
                        >
                          <Button
                            variant={field?.variant}
                            textContent={field?.textContent}
                            className={field?.class}
                            type={field?.type}
                            isLoading={infoState?.loader?.get_otp_button}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}

                  <div
                    className="text-end underline mt-4 cursor_pointer"
                    onClick={() => navigate(-1)}
                  >
                    Go back
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* OTP Popup */}
      {infoState.otp.popup && (
        <Popup
          open={infoState.otp.popup}
          onClose={handleClosePopup}
          title={
            infoState.otp.show_password_input
              ? `${fields?.forgot_password_popup?.popup_title}`
              : ` ${fields?.forgot_password_popup?.popupTitle} ${formikRef?.current?.values?.email_id}`
          }
          width={infoState.otp.show_password_input ? 450 : 550}
        >
          {/* OTP Input Section */}
          {!infoState.otp.show_password_input && (
            <>
              {fields?.forgot_password_popup?.fields?.map((field, index) => {
                if (field?.field === "otp") {
                  return (
                    <div key={index}>
                      <OtpInput
                        name="otp"
                        value={infoState.otp.otp_value}
                        onChange={handleOtpChange}
                        length={field?.length}
                        showAsterisk={field?.showAsterisk}
                        error={infoState?.otp?.errors?.otp}
                      />
                      {/* Timer Display */}
                      <div className="text-center mt-3">
                        <span className="text-sm text-gray-600">
                          Time remaining:{" "}
                          <span className="font-semibold text-blue-600">
                            {formatTimer(infoState.otp.timer)}
                          </span>
                        </span>
                      </div>
                      {infoState.otp.timer === 0 && (
                        <div className="text-center mt-2">
                          <span className="text-sm text-red-600">
                            OTP expired. Please request a new one.
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}

              {/* OTP Buttons in Row */}
              <div className="flex gap-3 justify-center budget_auth_btn_section mt-4">
                {fields?.forgot_password_popup?.fields?.map((field, index) => {
                  if (field?.field === "button") {
                    const handleClick =
                      field?.textContent === "Submit"
                        ? handleOtpSubmit
                        : field?.textContent === "Re-Send"
                        ? handlePopupOpen
                        : () => {};

                    // Decide the disabled state individually
                    const isDisabled =
                      (field?.textContent === "Submit" &&
                        infoState.otp.timer === 0) ||
                      (field?.textContent === "Re-Send" &&
                        infoState.otp.timer !== 0);
                    const loading =
                      (field?.textContent === "Submit" &&
                        infoState?.loader?.otp_verified_otp) ||
                      (field?.textContent === "Re-Send" &&
                        infoState?.loader?.get_otp_button);
                    return (
                      <Button
                        key={index}
                        variant={field?.variant}
                        textContent={field?.textContent}
                        className={field?.class}
                        type={field?.type}
                        onClick={handleClick}
                        isLoading={loading}
                        disabled={isDisabled}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </>
          )}

          {/* Password Input Section */}
          {infoState.otp?.show_password_input && (
            <>
              {fields?.forgot_password_popup?.verify_fields?.map(
                (field, index) => {
                  if (field?.field === "password") {
                    return (
                      <TextInput
                        key={index}
                        name={field?.name}
                        type={field?.type}
                        label={field?.label}
                        value={infoState.otp.password}
                        onChange={passwordChecker}
                        placeholder={field?.label}
                        showAsterisk={field?.showAsterisk}
                        error={infoState?.otp?.errors?.[field?.name]}
                      />
                    );
                  }
                  return null;
                }
              )}

              {/* Password Validation Hints */}
              <div className="flex justify-center mt-3">
                {passHint?.map((el) => (
                  <div
                    key={el.key}
                    className={`hitText rounded mx-1 px-1.5 py-2 ${
                      infoState?.password_validation[el.key]
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    style={{ fontSize: 10 }}
                  >
                    {el.text}
                  </div>
                ))}
              </div>

              {/* Password Buttons in Row */}
              <div className="flex gap-3 justify-center budget_auth_btn_section mt-4">
                {fields?.forgot_password_popup?.verify_fields?.map(
                  (field, index) => {
                    if (field?.field === "button") {
                      return (
                        <Button
                          key={index}
                          variant={field?.variant}
                          textContent={field?.textContent}
                          className={field?.class}
                          type={field?.type}
                          onClick={handleSubmitPassword}
                          isLoading={infoState?.loader?.submit_button}
                        />
                      );
                    }
                    return null;
                  }
                )}
              </div>
            </>
          )}
        </Popup>
      )}
    </>
  );
};

export default ForgotPassword;

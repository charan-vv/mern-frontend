import { Formik, Form } from "formik";
import React,{ useState } from "react";
import { LoginImg } from "../../../config";
import { TextInput, Button } from "../../../components";
import { loginValidationSchema } from "../../../validations/auth";
import fields from "../login.json";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [infoState, setInfoState] = useState({
    message: {
      success: { popup: false, message: "" },
      failure: { popup: false, message: "" },
    },
    loader: { login_button: false },
  });
  const navigate =useNavigate();

  const handleSignupNavigation = ()=>{
    navigate('/register')
  }
  const handleForgotPasswordNavigation = ()=>{
    navigate('/forgot-password')
  }

  const handleSubmit = (values ) => {
    console.log("Login submitted with:", values);
    setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, login_button: true },
    }));

    setTimeout(() => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, login_button: false },
      }));
    }, 1500);
  };


  const initialValues = {
    ...fields?.login?.reduce((acc, field) => {
    if (field.name) acc[field.name] = "";
    return acc;
  }, {}),
  role: "web",
};

  return (
    <div className="grid grid-cols-12">
      {/* Image Section */}
      <div className="col-span-6 flex items-center justify-center budget_auth_img_section">
        <LoginImg className="h-[633px]" />
      </div>

      {/* Login Form Section */}
      <div className="col-span-6 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
             <Formik initialValues={initialValues}validationSchema={loginValidationSchema}onSubmit={handleSubmit}>
                    {({ values,errors,touched,handleChange,handleBlur}) => (
                        <Form>
                              <h2 className="text-2xl font-bold mb-6">Login</h2>
                              {fields?.login?.map((field, index) => {
                              if (field?.field === "textInput" || field?.field === "password") {
                                   return (
                                           <TextInput key={index}name={field?.name}type={field?.type}label={field?.label}value={values[field?.name]}onChange={handleChange}onBlur={handleBlur}placeholder={field?.label}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>
                                          )}
                              if (field?.field === "button") {
                                    return (
                                            <React.Fragment key={index}>
                                                   <div className="text-end underline mt-1 cursor_pointer" onClick={handleForgotPasswordNavigation}>Forget Password?</div>
                                                   <div className="budget_auth_btn_section mt-2"><Button textContent={field?.textContent}className={field?.class}type={field?.type}isLoading={infoState?.loader?.login_button}/></div>
                                            </React.Fragment>
                                            )}
                              return null;
                              })}
                             <div className="text-end underline mt-4 cursor_pointer" onClick={handleSignupNavigation}>Sign up now and unlock the full experience!</div>
                        </Form>
                     )}
              </Formik>
         </div>
       </div>
    </div>
  );
};

export default Auth;

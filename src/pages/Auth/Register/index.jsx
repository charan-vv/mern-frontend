import { Formik, Form } from "formik";
import React,{ useState } from "react";
import { RegisterImg } from "../../../config";
import { TextInput, Button,PhoneNumber } from "../../../components";
import { registerValidationSchema } from "../../../validations/auth";
import fields from "../login.json";
import "../Login/style.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [infoState, setInfoState] = useState({
    message: {
      success: { popup: false, message: "" },
      failure: { popup: false, message: "" },
    },
    loader: { submit_button: false },
    form_data:{
      phone_number:"",
    }
  });
  
  const navigate =useNavigate();
  const handlePhoneChange = (value) => {
    setInfoState((prev)=>({
      ...prev,
       form_data:{
        ...prev?.form_data,
      phone_number:value,
    }
    }))
  };

  const handleSubmit = (values ) => {
    console.log("Login submitted with:", values);
    setInfoState((prev) => ({
      ...prev,
      loader: { ...prev.loader, submit_button: true },
    }));

    setTimeout(() => {
      setInfoState((prev) => ({
        ...prev,
        loader: { ...prev.loader, submit_button: false },
      }));
    }, 1500);
  };


const initialValues = {
    ...fields?.register?.reduce((acc, field) => {
    if (field.name) acc[field.name] = "";
    return acc;
  }, {}),
  role: "web",
};


  return (
    <div className="grid grid-cols-12">
      {/* Image Section */}
      <div className="col-span-6 flex items-center justify-center budget_auth_img_section">
        <RegisterImg className="h-[633px]" />
      </div>
      {/* Login Form Section */}
      <div className="col-span-6 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 shadow-lg rounded-lg max-h-[630px]  overflow-y-auto">
             <Formik initialValues={initialValues}validationSchema={registerValidationSchema}onSubmit={handleSubmit}>
                    {({values,errors,touched,handleChange,handleBlur}) => (
                        <Form>
                          
                              <h2 className="text-2xl font-bold mb-6">Register</h2>
                              {fields?.register?.map((field, index) => {
                              if (field?.field === "textInput" || field?.field === "password") {
                                   return (<TextInput key={index}name={field?.name}type={field?.type}label={field?.label}value={values[field?.name]}onChange={handleChange}onBlur={handleBlur}placeholder={field?.label}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>)        
                                  }
                              if (field?.field === "phone_number" ) {
                                   return (<PhoneNumber label={field?.label} name={field?.name} phoneNumber={infoState?.form_data?.phone_number} onPhoneChange={handlePhoneChange}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>)        
                                  }    
                              if (field?.field === "button") {
                                    return (<div key={index} className="budget_auth_btn_section mt-2"><Button textContent={field?.textContent}className={field?.class}type={field?.type}isLoading={infoState?.loader?.submit_button}/></div>)}
                              return null;
                              })}
                             <div className="text-end underline mt-4 cursor_pointer" onClick={() => navigate(-1)}>Go Back</div>
                        </Form>
                     )}
              </Formik>
         </div>
       </div>
    </div>
  );
};

export default Register;

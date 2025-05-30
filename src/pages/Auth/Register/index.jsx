import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterImg } from "../../../config";
import { TextInput, Button,PhoneNumber } from "../../../components";
import { registerValidationSchema } from "../../../validations/auth";
import fields from "../login.json";
import {useToast} from "../../../helpers/toaster"
import "../style.scss";
import { SignupAction } from "../../../redux/actions/auth";


const passHint = [
  { key: "minLength",text: "Min 8 Characters",isValid: (password) => password.length >= 8,},
  { key: "upperLower",text: "1 Upper & Lower case",isValid: (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),},
  { key: "number",text: "1 Number",isValid: (password) => /\d/.test(password),},
  { key: "specialChar",text: "1 Special Char",isValid: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),},
];


const Register = () => {
  const toast = useToast();
  const navigate =useNavigate();
  const dispatch=useDispatch();
  const [infoState, setInfoState] = useState({
    message: {
      success: { popup: false, message: "" },
      failure: { popup: false, message: "" },
    },
    loader: { submit_button: false },
    password_validation:{
       minLength: false,
       upperLower: false,
       number: false,
       specialChar: false,
    }
  });
  const passwordChecker =(el)=>{
   let text = el.target.value;
   setInfoState((prev)=>({
    ...prev,
    password_validation:{
      ...prev?.password_validation,
      minLength: text.length >= 8,
      upperLower: /[a-z]/.test(text) && /[A-Z]/.test(text),
      number: /\d/.test(text),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(text),
    }
   }))
  }
  const handleSubmit = (values) => {
  const { password_validation } = infoState;
  const allValid = Object?.values(password_validation)?.every(
    (val) => val === true
  );
  if (!allValid) {
    toast.error("Invalid password format. Please follow the required pattern ");
    return;
  }
  setInfoState((prev) => ({...prev,loader: { ...prev.loader, submit_button: true }}));
  const rawPhone = values?.phone_number.replace(/\D/g, ""); 
  const phone_number = rawPhone.slice(-10);
  const country_code = values?.phone_number.replace(phone_number, "");
  const payload = {
    ...values,
    phone: {
      country_code,
      phone_number,
    },
  };
  delete payload.phone_number; 

dispatch(SignupAction(payload)).then((res)=>{
  setInfoState((prev) => ({...prev,loader: { ...prev.loader, submit_button: false }}));
  console.log(res,"res")
  if(res?.payload?.code===200){
  toast.success(res?.payload?.message)
  navigate('/login')
  }else{
    toast.error(res?.payload?.message)
  }
})

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
                    {({values,errors,touched,handleChange,handleBlur,setFieldValue}) => (
                        <Form>
                              <h2 className="text-2xl font-bold mb-6">Register</h2>
                              {fields?.register?.map((field, index) => {
                              if (field?.field === "textInput" || field?.field === "password") {
                                   return (<TextInput key={index}name={field?.name}type={field?.type}label={field?.label}value={values[field?.name]}onChange={(el)=>{handleChange(el), field?.field === "password"&& passwordChecker(el) }}onBlur={handleBlur}placeholder={field?.label}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>)        
                                  }
                              if (field?.field === "phone_number" ) {
                                   return (<PhoneNumber label={field?.label} name={field?.name} phoneNumber={values[field?.name]} onPhoneChange={(el)=>{ setFieldValue('phone_number', el)}}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>)        
                                  }    
                              if (field?.field === "button") {
                                    return (<div key={index} className="budget_auth_btn_section mt-2"><Button textContent={field?.textContent}className={field?.class}type={field?.type}isLoading={infoState?.loader?.submit_button}/></div>)}
                              return null;
                              })}
                              <div className="flex mt-3">{passHint?.map((el) => (
                                   <div key={el.key} className={`hitText rounded mx-1 px-1.5 py-2 ${infoState?.password_validation[el.key]? "bg-green-200 text-green-800": "bg-gray-200 text-gray-800"}`}style={{ fontSize: 10 }}>
                                        {el.text}
                                    </div>
                                    ))}
                              </div>
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

import React, {useState, useEffect, useMemo } from 'react'
import { TextInput,Button, PhoneNumber } from 'src/components'
import data from "./data.json"
import { useInitialValues } from 'src/helpers/hooks'
import {basicDetailsValidationSchema} from "../../../../validations/settings"
import { Formik,Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { User_Get_List } from 'src/redux/actions/Settings'

const index = () => {

  // const initialValues =useInitialValues();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state?.user_details)
  const user_id =localStorage?.getItem("user_id")

  const [infoState,setInfoState]=useState({
    loader:{
      update_button:false
    }
  })

  useEffect(()=>{
    dispatch(User_Get_List(user_id))
  },[])

  const handleSubmit =()=>{

  }

  const initialValues = useMemo(() => {
    if (!user) return null;
    return {
      name: user?.name || '',
      user_name: user?.user_name || '',
      email_id: user?.email_id || '',
      phone_number:`${user?.phone?.country_code}${ user?.phone?.phone_number} `|| '',
    };
  }, [user]);
  

  return (
    <>
      <Formik initialValues={initialValues}validationSchema={basicDetailsValidationSchema}onSubmit={handleSubmit}>
              {({ values,errors,touched,handleChange,handleBlur}) => (
                  <Form>
                        <h2 className="text-2xl font-bold mb-6">Basic Details</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5'>
                          {data?.basic_details?.map((field, index) => {
                        if (field?.field === "textInput" ) {
                           return (
                                <TextInput key={index}name={field?.name}type={field?.type}label={field?.label}value={values[field?.name]}onChange={handleChange}onBlur={handleBlur}placeholder={field?.label}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>
                               )}
                        if (field?.field === "phone_number" ) {
                            return (
                                  <PhoneNumber label={field?.label} name={field?.name} phoneNumber={values[field?.name]} onPhoneChange={(el)=>{ setFieldValue('phone_number', el)}}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>
                                )}   
                        if (field?.field === "button") {
                            return (
                                  <React.Fragment key={index}>
                                       <div className="budget_auth_btn_section mt-2"><Button textContent={field?.textContent}className={field?.class}type={field?.type}isLoading={infoState?.loader?.update_button}/></div>
                                  </React.Fragment>
                                          )}
                          return null;
                          })}
                        </div>
                  </Form>
              )}
      </Formik>
    </>
  )
}

export default index
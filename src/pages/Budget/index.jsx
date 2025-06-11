import React, { useMemo, useState } from 'react'
import { Table,Popup, TextInput, Button } from 'src/components'
import data from "./data.json"
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Form, Formik } from 'formik';
import { budgetValidationSchema } from 'src/validations/budget';


const Budget = () => {
    const [infoState,setInfoState]=useState({
      edit_popup:{
        popup:false,
        data:{}
      },
      delete_popup:{
        popup:false,
        data:{},
      },
      add_popup:{
        popup:false,
        data:{}
      },
      loader:{
        save_button:false
      }
    })

  const onClickRowEdit = (record) => {
    setInfoState((prev) => ({
      ...prev,
      edit_popup: {
        popup: true,
        data: record,
      },
    }));
  };


  const handleDeletePopUp = (record) => {
    setInfoState((prev) => ({
      ...prev,
      delete_popup: {
        popup: true,
        data: record,
      },
    }));
  };


  const handleClosePopup = (key) => {
    setInfoState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        popup: false,
        data: {},
      },
    }));
  };


   const columns = useMemo(() => {
    const cols = data?.table_header?.map((el) => ({
      title: el?.title,
      dataIndex: el?.key,
      key: el?.key
    }));

    cols?.push({
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-3">
          <TbEdit
            className="cursor_pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClickRowEdit(record);
            }}
          />
          <MdOutlineDeleteOutline
            className="cursor_pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePopUp(record);
            }}
          />
        </div>
      ),
    });

    return cols;
  }, []);

 
   const initialValues = {
      ...data?.fields?.reduce((acc, field) => {
      if (field.name) acc[field.name] = "";
      return acc;
    }, {}),
  
  };


  const handleSubmit =(values)=>{
      setInfoState((prev) => ({...prev,loader: { ...prev.loader, login_button: true }}));

      setTimeout(()=>{  setInfoState((prev) => ({...prev,loader: { ...prev.loader, login_button: false }}));},200)
  }
  return (
    <>
    <Table
    dataSource={data?.table_data}
    columns={columns}
    hidePagination={true}
    />

     {infoState?.edit_popup?.popup && (
        <Popup
          open={infoState?.edit_popup?.popup}
          onClose={() => handleClosePopup('edit_popup')}
          title="Edit Budget Entry"
        >
          
           <div className="col-span-6 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
             <Formik initialValues={initialValues}validationSchema={budgetValidationSchema}onSubmit={handleSubmit}>
                    {({ values,errors,touched,handleChange,handleBlur}) => (
                        <Form>
                            
                              {data?.fields?.map((field, index) => {
                              if (field?.field === "textInput" ) {
                                   return (
                                           <TextInput key={index}name={field?.name}type={field?.type}label={field?.label}value={values[field?.name]}onChange={handleChange}onBlur={handleBlur}placeholder={field?.label}showAsterisk={field?.showAsterisk}error={touched[field?.name] && errors[field?.name]}/>
                                          )}
                              if (field?.field === "button") {
                                    return (
                                            <React.Fragment key={index}>
                                                   <div className="budget_auth_btn_section mt-2"><Button textContent={field?.textContent}className={field?.class}type={field?.type}isLoading={infoState?.loader?.save_button}/></div>
                                            </React.Fragment>
                                            )}
                              return null;
                              })}
                        </Form>
                     )}
              </Formik>
         </div>
       </div>

        </Popup>
      )}

    </>
  )
}

export default Budget
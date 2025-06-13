import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const Get_List_Action = createAsyncThunk(
  "post/list",
  async ( { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const result=await axios.post(`${import.meta.env.VITE_API_URI}/transaction/list`,config)
      return result?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);


export const Create_Transaction_Action =createAsyncThunk('post/create',async(payload,{rejectWithValue})=>{
    try{
        const config={
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }
        const result=await axios.post(`${import.meta.env.VITE_API_URI}/transaction/create`,payload,config)
        return result?.data;

    }catch(err){
        return rejectWithValue(err?.response?.data)
    }
})



export const Update_Transaction_Action =createAsyncThunk('put/update' ,async(payload,{rejectWithValue})=>{
    try{
        const config={
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }
        const uid =payload?.uid
        delete payload?.uid
        const result =await axios.put(`${import.meta.env.VITE_API_URI}/transaction/update/${uid}`,payload,config)
        return result?.data

    }catch(err){
        return rejectWithValue(err?.response?.data)
    }
})


export const Soft_Delete_Action = createAsyncThunk('delete/soft',async(payload,{rejectWithValue})=>{
    try{
        const config ={
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }

        const result =await axios.delete(`${import.meta.env.VITE_API_URI}/transaction/soft/${payload}`,config)
        return result?.data

    }catch (err){
        return rejectWithValue(err?.response?.data)
    }
})


export const Soft_Hard_Action = createAsyncThunk('delete/soft',async(payload,{rejectWithValue})=>{
    try{
        const config ={
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }

        const result =await axios.delete(`${import.meta.env.VITE_API_URI}/transaction/hard/${payload}`,config)
        return result?.data

    }catch (err){
        return rejectWithValue(err?.response?.data)
    }
})
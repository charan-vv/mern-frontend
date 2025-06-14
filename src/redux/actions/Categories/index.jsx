import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const Category_List_Action = createAsyncThunk(
  "post/category_list",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const result=await axios.post(`${import.meta.env.VITE_API_URI}/category/list`,{},config)
      return result?.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const Create_Category_Action =createAsyncThunk('post/category_create',async(payload,{rejectWithValue})=>{
    try{
        const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
        const result=await axios.post(`${import.meta.env.VITE_API_URI}/category/create`,payload,config)
        return result?.data;

    }catch(err){
        return rejectWithValue(err.response.data)
    }
})



export const Update_Category_Action =createAsyncThunk('put/category_update' ,async(payload,{rejectWithValue})=>{
    try{
        const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
        const uid =payload?.uid
        delete payload?.uid
        const result =await axios.put(`${import.meta.env.VITE_API_URI}/category/update/${uid}`,payload,config)
        return result?.data

    }catch(err){
        return rejectWithValue(err.response.data)
    }
})


export const Soft_Delete_Action = createAsyncThunk('delete/category_soft',async(payload,{rejectWithValue})=>{
    try{
       const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
        const result =await axios.delete(`${import.meta.env.VITE_API_URI}/category/soft/${payload}`,config)
        return result?.data

    }catch (err){
        return rejectWithValue(err.response.data)
    }
})


export const Hard_Delete_Action = createAsyncThunk('delete/category_hard',async(payload,{rejectWithValue})=>{
    try{
        const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
        const result =await axios.delete(`${import.meta.env.VITE_API_URI}/category/hard/${payload}`,config)
        return result?.data

    }catch (err){
        return rejectWithValue(err.response.data)
    }
})
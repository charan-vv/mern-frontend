import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const Budget_List_Action = createAsyncThunk(
  "post/budget_list",
  async ( _,{ rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
     
      const result=await axios.post(`${import.meta.env.VITE_API_URI}/budget/list`,{},config)
      return result?.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const Create_Budget_Action =createAsyncThunk('post/budget_create',async(payload,{rejectWithValue})=>{
    try{
        const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
        const result=await axios.post(`${import.meta.env.VITE_API_URI}/budget/create`,payload,config)
        return result?.data;

    }catch(err){
        return rejectWithValue(err.response.data)
    }
})



export const Update_Budget_Action =createAsyncThunk('put/budget_update' ,async(payload,{rejectWithValue})=>{
    try{
        const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
        const uid =payload?.uid
        delete payload?.uid
        const result =await axios.put(`${import.meta.env.VITE_API_URI}/budget/update/${uid}`,payload,config)
        return result?.data

    }catch(err){
        return rejectWithValue(err.response.data)
    }
})


export const Soft_Delete_Action = createAsyncThunk('delete/budget_soft',async(payload,{rejectWithValue})=>{
    try{
        const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
        const result =await axios.delete(`${import.meta.env.VITE_API_URI}/budget/soft/${payload}`,config)
        return result?.data

    }catch (err){
        return rejectWithValue(err.response.data)
    }
})


export const Hard_Delete_Action = createAsyncThunk('delete/budget_hard',async(payload,{rejectWithValue})=>{
    try{
        const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
        const result =await axios.delete(`${import.meta.env.VITE_API_URI}/budget/hard/${payload}`,config)
        return result?.data

    }catch (err){
        return rejectWithValue(err.response.data)
    }
})
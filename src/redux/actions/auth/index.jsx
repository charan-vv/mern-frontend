import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Login
export const LoginAction = createAsyncThunk('sd/login_action',async(payload,{rejectWithValue}) => {
    try{
        const result = await axios.post(`${import.meta.env.VITE_API_URI}/login`,payload);
        return result?.data;
    }catch(err){
       
        return  rejectWithValue(err.response.data);
    }
})

// SignUp

export const SignupAction =createAsyncThunk('sd/signup_action',async (payload,{rejectWithValue})=>{
    try{
        const result=await axios.post(`${import.meta.env.VITE_API_URI}/signup`,payload)
        console.log(result,"result")
        return result?.data;

    }catch(err){
        return rejectWithValue(err.response.data)
    }
})
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
        return result?.data;

    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

// getOtp

export const GetOtpAction =createAsyncThunk('sd/get_otp',async(payload,{rejectWithValue})=>{
    try{
        const result =await axios.post(`${import.meta.env.VITE_API_URI}/get-otp`,payload)
        return result?.data;

    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

// verify-otp

export const VerifyOtpAction=createAsyncThunk('sd/verify-otp',async(payload,{rejectWithValue})=>{
    try{
        const result= await axios.post(`${import.meta.env.VITE_API_URI}/verify-otp`,payload)
       
       return result?.data
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

// reset password

export const ResetPasswordAction =createAsyncThunk('sd/reset_password',async(payload,{rejectWithValue})=>{
    try{
        const uid=payload?.uid
        delete payload?.uid
        const result= await axios.post(`${import.meta.env.VITE_API_URI}/reset-password/${uid}`,payload)
        return result?.data
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})
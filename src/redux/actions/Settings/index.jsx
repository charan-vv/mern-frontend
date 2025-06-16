import  axios from "axios";
import {createAsyncThunk } from "@reduxjs/toolkit"


export const User_Get_List = createAsyncThunk("user/get",async(payload,{rejectWithValue})=>{
try{

    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const result = await axios.get(`${import.meta.env.VITE_API_URI}/user/${payload}`,config)
      return result?.data

}catch(err){
    return rejectWithValue(err.response.data)
}
})
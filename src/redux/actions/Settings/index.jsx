import  axios from "axios";
import {createAsyncThunk } from "@reduxjs/toolkit"
import { is_loading_false,is_loading_true } from "src/redux/feature/loader";


export const User_Get_List = createAsyncThunk(
  "user/get",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      dispatch(is_loading_true());
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const result = await axios.get(
        `${import.meta.env.VITE_API_URI}/user/${payload}`,
        config
      );
      dispatch(is_loading_false());
      return result?.data;
    } catch (err) {
      dispatch(is_loading_false());
      return rejectWithValue(err.response.data);
    }
  }
);
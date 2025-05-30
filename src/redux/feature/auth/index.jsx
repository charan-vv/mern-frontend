import { createSlice } from "@reduxjs/toolkit";

const initial_state={
    user_id:null,
    token:null,
    loading:false,
}

const login_slice =createSlice({
    name:"login_slice",
    initialState:initial_state,
    reducers:{
        login_request:(state)=>{state.loading=true},
        login_success:(state,action)=>{
            state.user_id=action.payload.user_id,
            state.token=action.payload.token,
            state.loading=false
        },
        login_faliure:(state)=>{state.loading=false},
        logout_success:(state)=>{
            state.loading=false,
            localStorage.clear();
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            window.location.reload();
        }
    }
})

export const {login_request,login_success,login_faliure,logout_success}=login_slice.actions;

export default login_slice.reducer;
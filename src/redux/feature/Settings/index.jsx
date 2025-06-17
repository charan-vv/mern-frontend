import {createSlice} from "@reduxjs/toolkit"
import { User_Get_List } from "src/redux/actions/Settings"


const initial_state={
    user:{},
    loading:false,
    error:null,
}

const user_slice =createSlice({
    name:"user_slice",
    initialState:initial_state,
    reducers:{},
    extraReducers:(builder)=>{
        builder
                .addCase(User_Get_List.pending,(state)=>{
                    state.loading=true;
                    state.error=null;
                })
                .addCase(User_Get_List.fulfilled,(state,{payload})=>{
                    state.user=payload?.data,
                    state.loading=false;
                })
                .addCase(User_Get_List.rejected,(state,{payload})=>{
                    state.loading=false,
                    state.error=payload?.message
                })
    }
})

export default user_slice.reducer
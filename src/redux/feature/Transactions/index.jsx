import { createSlice } from "@reduxjs/toolkit";
import { Transaction_List_Action } from "src/redux/actions/Transactions";


const initial_state={
    transaction_list:[],
    total:0,
    loading:false,
    error:null,
}

const transaction_list_slice = createSlice({
    name:"transaction_list_slice",
    initialState:initial_state,
    reducers:{},
    extraReducers: (builder)=>{
        builder 
                .addCase(Transaction_List_Action.pending,(state)=>{
                    state.loading=true;
                    state.error=null;
                })
                .addCase(Transaction_List_Action.fulfilled,(state,{payload})=>{
                    state.loading=false;
                    state.transaction_list=payload?.data;
                    state.total=payload?.total;
                })
                .addCase(Transaction_List_Action.rejected,(state,{payload})=>{
                    state.loading=false;
                    state.error=payload.message;
                })
    }
})

export default transaction_list_slice.reducer;
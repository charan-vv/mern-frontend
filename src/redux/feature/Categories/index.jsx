import { createSlice } from "@reduxjs/toolkit";
import {Category_List_Action } from "../../actions/Categories"


const initial_state={
    category_list:[],
    total:0,
    error:null,
    loading:false
}


const categories_list_slice =createSlice({
    name:"categories_list_slice",
    initialState:initial_state,
    reducers:{},
    extraReducers : (builder)=>{
        builder

                .addCase(Category_List_Action.pending,(state)=>{
                    state.loading=true;
                    state.error=null;
                })
                .addCase(Category_List_Action.fulfilled,(state,{payload})=>{
                    state.loading=false;
                    state.category_list=payload?.data;
                    state.total=payload?.count;
                })
                .addCase(Category_List_Action.rejected,(state,{payload})=>{
                    state.loading=false;
                    state.error=payload?.message;
                })
    }
})

export default categories_list_slice.reducer;
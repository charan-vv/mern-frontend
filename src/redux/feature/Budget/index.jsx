import {createSlice} from "@reduxjs/toolkit"
import {Get_List_Action} from "../../actions/Budget"

const initial_state={
    data:[],
    loading:false,
    error:"",
   
}


const budget_list_slice =createSlice({
    name:"budget_list_slice",
    initialState:initial_state,
    reducers:{},
    extraReducers : (builder)=>{
        builder
            .addCase(Get_List_Action.pending,(state)=>{
                state.loading=true,
                state.error =null
            })
            .addCase(Get_List_Action.fulfilled,(state,{payload})=>{
                state.loading=false,
                state.data
            })
    }
})
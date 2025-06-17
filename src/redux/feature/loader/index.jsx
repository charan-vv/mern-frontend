import { createSlice } from "@reduxjs/toolkit";

const initial_state={
    loader:false,
}


const loader_slice = createSlice({
    name:"loader_slice",
    initialState:initial_state,
    reducers:{
        is_loading_true:(state)=>{
            state.loader=true;
        },
        is_loading_false:(state)=>{
            state.loader=false;
        }
    }
})

export const {is_loading_true ,is_loading_false} = loader_slice.actions;

export default loader_slice.reducer
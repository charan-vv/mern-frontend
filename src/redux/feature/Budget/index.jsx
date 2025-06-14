import { createSlice } from "@reduxjs/toolkit"
import { Budget_List_Action } from "../../actions/Budget"

const initial_state = {
    budget_list: [],
    loading: false,
    error: "",
    total: 0
}

const budget_list_slice = createSlice({
    name: "budget_list_slice",
    initialState: initial_state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Budget_List_Action.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Budget_List_Action.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.budget_list = payload?.data;
                state.total = payload?.total;
            })
            .addCase(Budget_List_Action.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            })
    }
})

export default budget_list_slice.reducer
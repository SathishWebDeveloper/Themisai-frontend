/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { fetchMattersWorkFlow } from "../service/workflowServices";

interface InitialState {
    //   token: string | null;
    loading: boolean;
    errorMessage: string;
    successMessage: string;
    workflowInfo: null | any;
}

const initialState: InitialState = {
    //   token: "",
    loading: false,
    errorMessage: "",
    successMessage: "",
    workflowInfo: null,
};

export const workflow = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        // tokenGenerate: (state: InitialState, action: PayloadAction<any>) => {
        //   state.token = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMattersWorkFlow.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(fetchMattersWorkFlow.fulfilled, (state, action: any) => {
                state.loading = false;
                state.workflowInfo = action.payload.data;
                state.errorMessage = "";
            })
            .addCase(fetchMattersWorkFlow.rejected, (state, action: any) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            })

    },
});

// export const { reset } = matters.actions;

export default workflow.reducer;

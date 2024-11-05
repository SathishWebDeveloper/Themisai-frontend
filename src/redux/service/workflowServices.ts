/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_CONFIG } from 'src/utils/config';
const { API_BASE_URL, API_VERSION } = APP_CONFIG


export const fetchMattersWorkFlow = createAsyncThunk<any, any>(
    "matter/workflow",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/${API_VERSION}/workflow/get-all-workflow/${data}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteWorkflowRequest = createAsyncThunk<any, any>(
    "matter/workflow",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/${API_VERSION}/workflow/delete/${data.id}`,
            );
            if (response?.status === 200) {
                data.callback();
            }
            return response.data; // Return data after successful request
        } catch (error: any) {
            return rejectWithValue(error.message); // Reject with value to trigger error state in Redux
        }
    }
);

// export const fetchMattersDetails = createAsyncThunk<any, any>(
//   "user/mattersDetails",
//   async (mattersId) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/${API_VERSION}/matters/get-matters/${mattersId}`
//       );
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching matters data:", error);
//     }
//   }
// );



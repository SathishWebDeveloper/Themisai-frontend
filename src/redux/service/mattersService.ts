/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_CONFIG } from "src/utils/config";
const { API_BASE_URL, API_VERSION } = APP_CONFIG;

interface MattersValues {
  userId: string;
}

export const fetchMattersForUser = createAsyncThunk<MattersValues, string>(
  "user/matters",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${API_VERSION}/matters/user/get-user-matters/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message); // Reject with value to trigger error state in Redux
      // throw error;
    }
  }
);

export const createMatters = createAsyncThunk<any, any>(
  "user/createMatters",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${API_VERSION}/matters/create-matters`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.status === 201) {
        data.callback();
      }
      return response.data; // Return data after successful request
    } catch (error: any) {
      console.error("Create-matters error:", error);
      return rejectWithValue(error.message); // Reject with value to trigger error state in Redux
    }
  }
);

export const fetchMattersDetails = createAsyncThunk<any, any>(
  "user/mattersDetails",
  async (mattersId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${API_VERSION}/matters/get-matters/${mattersId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching matters data:", error);
      return rejectWithValue(error);
    }
  }
);

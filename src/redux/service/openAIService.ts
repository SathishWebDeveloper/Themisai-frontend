/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_CONFIG } from "src/utils/config";
const { API_BASE_URL, API_VERSION } = APP_CONFIG;

export const createDocumentsSummary = createAsyncThunk<any, any>(
  "user/documentsSummary",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${API_VERSION}/openai/gpt/summary`, data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        data.callback();
      }
      return response;
    } catch (error: any) {
      console.error("openai-error:", error);
      return rejectWithValue(error.message);
    }
  }
);
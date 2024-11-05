/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_CONFIG } from "src/utils/config";
import { setAuth } from "src/utils/helpers";
const { API_BASE_URL, API_VERSION } = APP_CONFIG;

export interface LoginCredentials {
  email: string;
  password: string;
  callback: () => void;
}

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  callback: () => void;
}

export const loginUser = createAsyncThunk<LoginCredentials, LoginCredentials>(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${API_VERSION}/auth/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.status === 200) {
        data.callback();
        const userData = { isAuth: true, ...response.data };
        setAuth(userData);
        return userData;
      }
      return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const registerUser = createAsyncThunk<
  RegisterCredentials,
  RegisterCredentials
>("user/regiser", async (data, thunkAPI) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/auth/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response?.status === 201) {
      data.callback();
      return response.data;
    }
    return `${response.status} : ${response.statusText}`;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});




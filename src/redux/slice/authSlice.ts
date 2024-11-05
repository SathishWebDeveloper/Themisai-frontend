/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
} from "../service/authService";

interface InitialState {
  token: string | null;
  loading: boolean;
  errorMessage: string;
  successMessage: string;
  isAuth: boolean;
  userInfo: null | any;
  mattersInfo: null | any;
}

const initialState: InitialState = {
  token: "",
  loading: false,
  errorMessage: "",
  successMessage: "",
  isAuth: false,
  userInfo: null,
  mattersInfo: null,
};

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    tokenGenerate: (state: InitialState, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    logout: (state: InitialState) => {
      state.token = initialState.token;
      state.loading = initialState.loading;
      state.errorMessage = initialState.errorMessage;
      state.isAuth = initialState.isAuth;
      state.userInfo = initialState.userInfo;
      state.mattersInfo = initialState.mattersInfo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuth = true;
        state.successMessage = "Login successful"
        state.errorMessage = "";
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action.payload.status === 401
            ? "Email / Password Invalid"
            : "Something Went Wrong..!";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.successMessage = "User Register Successful";
        state.errorMessage = "";
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
  },
});

export const { tokenGenerate, logout } = login.actions;

export default login.reducer;

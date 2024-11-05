/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLogo from "@assets/images/applogo.png";
import BannerPlaceHolderImg from "@assets/images/banner-img.jpg";
import GoogleIcon from "@assets/images/google logo.png";
import InputTextField from "@components/styled-components/InputTextField";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import "@styles/index.scss";
import "@styles/scss/layouts/login.scss";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AlertBox } from "src/components/alertbox";
import Loader from "src/components/loader";
import { loginUser } from "src/redux/service/authService";
import { AppDispatch } from "src/redux/store/store";
import { ILoginValues } from "src/types/auth";
import * as Yup from "yup";

const initialValues: ILoginValues = { email: "", password: "" };

// validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required *")
    .test("email", "Email is invalid", (value) => {
      return validateEmail(value);
    }),
  password: Yup.string()
    .min(8, "Password must be 8 characters long *")
    .required("Password is required *"),
});

// validate email function
const validateEmail = (email: string) => {
  return Yup.string().email().isValidSync(email);
};

const Login: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const errorMsg = useSelector((state: any) => state.login.errorMessage);
  const isFetching = useSelector((state: any) => state.login.loading);
  const isAuthenticated = useSelector((state: any) => state.login.isAuth);
  // const successMessage = useSelector((state: any) => state.login.successMessage);
  // handle form submit
  const handleSubmit = async (values: ILoginValues) => {
    dispatch(
      loginUser({
        ...values,
        callback: () => {
          navigate("/dashboard");
          // setTimeout(() => {
          //   navigate("/matters");
          // }, 2500);
        },
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isFetching && <Loader />}
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            height: "100vh",
            width: "100%",
            padding: 5,
            paddingLeft: 10,
          }}
        >
          <Grid className="gridContainerHeader">
            <Box className="boxloginContainer">
              <img
                src={AppLogo}
                alt="logo doesn't exist"
                className="box-custom-image"
              />
              <Typography className="typography-theme">themis.AI</Typography>
            </Box>

            <Box className="siginup-header">
              <Typography className="siginup-subtitle1">
                Welcome back To
              </Typography>
              <Typography className="siginup-subtitle1">
                Your Account
              </Typography>
              <Typography className="siginup-subtitle2">
                Login to your account..
                <Typography className="typography-account">
                  Don’t have an account?
                  <Typography
                    className="siginin-spantext"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </Typography>
                </Typography>
              </Typography>
            </Box>

            <Box className="banner-placholder-style">
              <Box
                component="img"
                className="banner-image"
                alt="bannerimg-placeholder"
                src={BannerPlaceHolderImg}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{ height: "100vh", width: "100%" }}
        >
          <Box className="login-form-container">
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => {
                return (
                  <>
                    <form className="formik-form" onSubmit={handleSubmit}>
                      <Box
                        className="login-inputcontainer"
                        component="form"
                        autoComplete="off"
                      >
                        <InputTextField
                          name="email"
                          label="Enter Your Email"
                          // id="custom-css-outlined-input"
                          error={touched.email && !!errors.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.email ? errors.email : ""}
                          value={values.email}
                          style={{ marginBottom: "10px" }}
                          fullWidth
                        />
                      </Box>

                      <Box
                        className="login-inputcontainer"
                        component="form"
                        autoComplete="off"
                      >
                        <InputTextField
                          name="password"
                          label="Enter Your Password"
                          id="custom-css-outlined-input"
                          error={touched.password && !!errors.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.password ? errors.password : ""}
                          value={values.password}
                          style={{ marginBottom: "10px" }}
                          fullWidth
                        />
                      </Box>

                      <Box className="forgotPassword-Container">
                        <Typography className="siginin-spantext">
                          Forgot password?
                        </Typography>
                      </Box>

                      <Grid item className="login-btn-action-container">
                        <Button
                          variant="contained"
                          className="siginup-btn"
                          sx={{ backgroundColor: "#0C111A" }}
                          type="submit"
                        >
                          LogIn
                        </Button>
                      </Grid>
                      {/* <Box className="login-server-side-error-container">
                        {successMessage && (
                          <Box>
                            <AlertBox successMessage={successMessage} />
                          </Box>
                        )}
                      </Box> */}
                      <Box className="login-server-side-error-container">
                        {errorMsg && (
                          <Box className="login-server-side-error">
                            <AlertBox errorMsg={errorMsg || ""} />
                          </Box>
                        )}
                      </Box>

                      <Box component="div" className="login-divider-style">
                        <Divider className="dividertext">Or</Divider>
                      </Box>

                      <Box className="socialmedialogin-container">
                        <Box
                          component="img"
                          alt="bannerimg-placeholder"
                          src={GoogleIcon}
                        />
                        <Typography className="login-socialmediatext">
                          Sign up with Google
                        </Typography>
                      </Box>
                    </form>
                  </>
                );
              }}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

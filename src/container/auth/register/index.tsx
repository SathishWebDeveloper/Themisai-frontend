/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLogo from "@assets/images/applogo.png";
import BannerPlaceHolderImg from "@assets/images/banner-img-2.jpg";
import GoogleIcon from "@assets/images/google logo.png";
import InputTextField from "@components/styled-components/InputTextField";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import "@styles/index.scss";
import "@styles/scss/layouts/register.scss";
import { Formik } from "formik";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AlertBox } from "src/components/alertbox";
import Loader from "src/components/loader";
import { registerUser } from "src/redux/service/authService";
import { AppDispatch } from "src/redux/store/store";
import { IRegisterValues } from "src/types/auth";
import * as Yup from "yup";

const initialValues: IRegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required *"),
  lastName: Yup.string().required("Last name is required *"),
  email: Yup.string()
    .required("Email is required *")
    .test("email", "Email is invalid", (value) => {
      return validateEmail(value);
    }),
  password: Yup.string()
    .min(8, "Password must be 8 characters long *")
    .required("Password is required *"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required *")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const validateEmail = (email: string) => {
  return Yup.string().email().isValidSync(email);
};

const Register: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const errorMsg = useSelector((state: any) => state.login.errorMessage);
  const isFetching = useSelector((state: any) => state.login.loading);
  // const isAuthenticated = useSelector((state: any) => state.login.userInfo);

  // handle form submit
  const handleSubmit = async (values: IRegisterValues) => {
    delete values.confirmPassword;
    dispatch(
      registerUser({
        ...values,
        callback: () => {
          navigate("/");
          // setTimeout(() => {
          //   navigate("/");
          // }, 2500);
        },
      })
    );
  };

  // useEffect(() => {
  //   if (isAuthenticated && isAuthenticated.staus) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated, navigate]);
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
              <Typography className="siginup-subtitle1">Sign up To</Typography>
              <Typography className="siginup-subtitle1">
                Create an Account
              </Typography>
              <Typography className="siginup-subtitle2">
                Fill up the form to create a new account.
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  Already have an account?
                  <Typography
                    className="siginup-spantext"
                    onClick={() => navigate("/")}
                  >
                    Sign in
                  </Typography>
                </Typography>
              </Typography>
            </Box>
            <Box className="banner-placholder-style">
              <Box
                component="img"
                sx={{ height: "310px", width: "auto", objectFit: "contain" }}
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
          <Box className="form-container">
            {/* Card box */}
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({
                errors,
                touched,
                values,
                handleSubmit,
                handleBlur,
                handleChange,
              }) => {
                return (
                  <>
                    <form className="formik-form" onSubmit={handleSubmit}>
                      <Box
                        className="inputcontainer"
                        component="form"
                        autoComplete="off"
                      >
                        <InputTextField
                          name="firstName"
                          label="Enter Your First Name"
                          id="custom-css-outlined-input"
                          error={touched.firstName && !!errors.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.firstName ? errors.firstName : ""}
                          value={values.firstName}
                          fullWidth
                        />
                      </Box>

                      <Box
                        className="inputcontainer"
                        component="form"
                        autoComplete="off"
                      >
                        <InputTextField
                          name="lastName"
                          label="Enter Your Last Name"
                          id="custom-css-outlined-input"
                          error={touched.lastName && !!errors.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.lastName ? errors.lastName : ""}
                          value={values.lastName}
                          style={{ marginBottom: "10px" }}
                          fullWidth
                        />
                      </Box>

                      <Box
                        className="inputcontainer"
                        component="form"
                        autoComplete="off"
                      >
                        <InputTextField
                          name="email"
                          label="Enter Your Email"
                          id="custom-css-outlined-input"
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
                        className="inputcontainer"
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

                      <Box
                        className="inputcontainer"
                        component="form"
                        autoComplete="off"
                      >
                        <InputTextField
                          name="confirmPassword"
                          label="Enter Your Confirm Password"
                          id="custom-css-outlined-input"
                          error={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.confirmPassword
                              ? errors.confirmPassword
                              : ""
                          }
                          value={values.confirmPassword}
                          style={{ marginBottom: "10px" }}
                          fullWidth
                        />
                      </Box>

                      <Grid item className="btn-action-container">
                        <Button
                          variant="contained"
                          className="siginup-btn"
                          sx={{ backgroundColor: "#0C111A", width: "100%" }}
                          type="submit"
                        >
                          Sign Up
                        </Button>
                      </Grid>

                      <Box className="Register-server-side-error-container">
                        <Box className="login-server-side-error-container">
                          {/* {successMessage && (
                            <Box>
                              <AlertBox
                                successMessage={successMessage}
                              />
                            </Box>
                          )} */}
                          {errorMsg && (
                            <Box
                              className="login-server-side-error"
                              style={{
                                position: "absolute",
                                top: 30,
                                right: 50,
                              }}
                            >
                              <AlertBox errorMsg={errorMsg || ""} />
                            </Box>
                          )}
                        </Box>
                      </Box>

                      <Box component="div" className="divider-style">
                        <Divider className="dividertext">Or</Divider>
                      </Box>

                      <Box className="socialmedialogin-container">
                        <Box
                          component="img"
                          sx={{}}
                          alt="bannerimg-placeholder"
                          src={GoogleIcon}
                        />
                        <Typography className="socialmediatext">
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

export default Register;

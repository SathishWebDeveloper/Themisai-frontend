/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertBox } from "@components/alertbox";
import Loader from "@components/loader";
import { CustomPrimaryButton } from "@components/styled-components";
import InputTextField from "@components/styled-components/InputTextField";
import { Box, Card, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "@styles/scss/layouts/create-matter.scss";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { createMatters } from "src/redux/service/mattersService";
import { AppDispatch } from "src/redux/store/store";
import { IIMattersFormValue } from "src/types/matters";
import * as Yup from "yup";

const initialValues: IIMattersFormValue = {
  clientName: "",
  subject: "",
};

const mattersformSchema = Yup.object().shape({
  clientName: Yup.string().required("Client name is required"),
  subject: Yup.string().required("Subject is required"),
});

const CreateNewMatter = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const descriptionRef = useRef<any>(null);
  const userLoggedId = useSelector((state: any) => state.login.userInfo);
  const { id } = userLoggedId?.userInfo;
  const isFetching = useSelector((state: any) => state.matters.loading);
  const successMessage = useSelector(
    (state: any) => state.matters.successMessage
  );

  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (values: any) => {
    dispatch(
      createMatters({
        ...values,
        status: "Active",
        description: description,
        userId: id,
        callback: () => {
          // navigate("/matters")
          setTimeout(() => {
            navigate("/matters");
          }, 2500);
        },
      })
    );
  };

  const handleDescriptionChange = (content: any) => {
    setDescription(content);
  };

  const handleCancel = () => {
    if (descriptionRef.current) {
      const editor: any = descriptionRef.current.getEditor();
      if (editor) {
        editor.setText("");
      }
    }
  };

  return (
    <>
      {isFetching && <Loader />}
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginRight: "10%",
          padding: 5,
        }}
      >
        <CustomPrimaryButton
          variant="contained"
          onClick={() => navigate("/matters")}
        >
          back
        </CustomPrimaryButton>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={mattersformSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "30px",
              }}
            >
              <Card
                sx={{
                  width: "60%",
                  boxShadow: 3,
                  padding: 4,
                }}
              >
                <div style={{ marginLeft: 12 }}>
                  <h1>Create Matter</h1>
                </div>
                <div style={{ padding: "16px" }}>
                  <Divider color="#212121"></Divider>
                </div>
                <div style={{ padding: 8 }}>
                  <Box
                    sx={{
                      "& > :not(style)": { marginBottom: 4, width: "100%" },
                    }}
                  >
                    <InputTextField
                      name="clientName"
                      value={values.clientName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{
                        "& .css-1wc848c-MuiFormHelperText-root ": {
                          color: "red !important",
                          fontSize: "13px !important",
                          marginTop: "0px !important",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            width: "100%",
                          },
                          "&.Mui-focused fieldset": {
                            width: "100%",
                          },
                        },
                      }}
                      id="outlined-basic"
                      label="Client Name"
                      variant="outlined"
                      error={touched.clientName && Boolean(errors.clientName)}
                      helperText={touched.clientName ? errors.clientName : ""}
                      maxRows={10}
                    />
                    <InputTextField
                      name="subject"
                      id="outlined-multiline-static"
                      label="Subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{
                        "& .css-1wc848c-MuiFormHelperText-root ": {
                          color: "red !important",
                          fontSize: "13px !important",
                          marginTop: "0px !important",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            width: "100%",
                            marginBottom: "15px !important",
                          },
                          "&.Mui-focused fieldset": {
                            width: "100%",
                            marginBottom: "15px",
                          },
                        },
                      }}
                      variant="outlined"
                      maxRows={10}
                      error={touched.subject && Boolean(errors.subject)}
                      helperText={touched.subject ? errors.subject : ""}
                    />
                    <div>
                      <Box
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          marginBottom: "10px",
                        }}
                      >
                        Description :
                      </Box>
                      <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={handleDescriptionChange}
                        // style={{ maxWidth: "100vh" }}
                        ref={descriptionRef}
                      />
                    </div>
                    <Box>
                      <Box>
                        {successMessage && (
                          <Box
                            className="login-server-side-error"
                            style={{
                              position: "absolute",
                              top: 90,
                              right: 290,
                            }}
                          >
                            <AlertBox
                              successMessage={
                                successMessage || `Login successful`
                              }
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="outlined"
                        style={{ borderColor: "#212B36", color: "#212B36" }}
                        type="reset"
                        onClick={() => {
                          handleReset();
                          handleCancel();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#212B36" }}
                        type="submit"
                      >
                        Create Matters
                      </Button>
                    </Stack>
                  </Box>
                </div>
              </Card>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateNewMatter;

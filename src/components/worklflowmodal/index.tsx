/* eslint-disable @typescript-eslint/prefer-as-const */
import { FileUploadedData } from "@components/cardbox";
import { CustomPrimaryButton } from "@components/styled-components";
import InputTextField from "@components/styled-components/InputTextField";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "@styles/scss/components/workflowmodal.scss";
import { Field, Form, Formik } from "formik";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createDocumentsSummary } from "src/redux/service/openAIService";
import { AppDispatch } from "src/redux/store/store";
import * as Yup from "yup";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface WorkflowModalProps {
  isopenWorkflow: boolean;
  handleClose: () => void;
  fileData?: FileUploadedData[];
}

const WorkflowModal: FC<WorkflowModalProps> = ({
  isopenWorkflow,
  handleClose,
  fileData,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const initialValues = {
    workflowTitle: "",
    selectedFiles: [] as string[],
  };

  const validationSchema = Yup.object({
    workflowTitle: Yup.string().required("Workflow title is required"),
    selectedFiles: Yup.array().min(1, "Select at least one file"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    const selectedFileLinks = values.selectedFiles
      .map((fileName) => {
        const file = fileData?.find((fileLink) => fileLink.file === fileName);
        return file?.link?.toString() ?? "";
      })
      .filter((link) => link !== "");

    const updateFormData = {
      title: values.workflowTitle,
      selectedFiles: values.selectedFiles,
      selectedFileLinks: selectedFileLinks,
      resources: selectedFileLinks.length,
      matterId: id,
    };

    dispatch(
      createDocumentsSummary({
        ...updateFormData,
        callback: () => {
          handleClose();
        },
      })
    );
  };

  return (
    <Modal
      open={isopenWorkflow}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue, errors, touched }) => (
            <Form>
              <Typography variant="h5" sx={{ padding: "10px" }}>
                Work Flow
              </Typography>
              <Field
                as={InputTextField}
                name="workflowTitle"
                value={values.workflowTitle}
                onChange={handleChange}
                error={touched.workflowTitle && Boolean(errors.workflowTitle)}
                helperText={touched.workflowTitle && errors.workflowTitle}
                sx={{ width: "50%" }}
                className="workflow-modal-input"
              />
              <Typography variant="h5" sx={{ padding: "10px" }}>
                Select Files
              </Typography>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Select files
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={values.selectedFiles}
                  onChange={(
                    event: SelectChangeEvent<typeof values.selectedFiles>
                  ) => {
                    const {
                      target: { value },
                    } = event;
                    const selectedFiles =
                      typeof value === "string" ? value.split(",") : value;
                    setFieldValue("selectedFiles", selectedFiles);
                  }}
                  input={<OutlinedInput label="Select files" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={MenuProps}
                  className="workflow-modal-multi-select"
                >
                  {fileData?.map((file, index) => (
                    <MenuItem key={index} value={file.file}>
                      <Checkbox
                        checked={values.selectedFiles.indexOf(file.file) > -1}
                      />
                      <ListItemText primary={file.file} />
                    </MenuItem>
                  ))}
                </Select>
                {touched.selectedFiles && Boolean(errors.selectedFiles) && (
                  <Typography color="error">{errors.selectedFiles}</Typography>
                )}
              </FormControl>
              <Box>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Summarized Text"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Summarized Text"
                    control={<Radio />}
                    label="Summarized Text"
                  />
                </RadioGroup>
              </Box>
              <CustomPrimaryButton
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Submit
              </CustomPrimaryButton>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default WorkflowModal;

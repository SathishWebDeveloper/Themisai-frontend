/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import { FC } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createDocumentsSummary } from "src/redux/service/openAIService";
// import { AppDispatch } from "src/redux/store/store";
import { AISummaryReport } from "./aisummary";

interface AISummaryProps {
  summaryContent: string;
}

const AISummary: FC<AISummaryProps> = ({ summaryContent }) => {
  // const dispatch: AppDispatch = useDispatch();

  // const mattersInfo = useSelector(
  //   (state: any) => state.matters.mattersDetailInfo
  // );

  // const chatGPTResponse = useSelector((state: any) => state.openAI.summaryInfo);

  // const newArray = chatGPTResponse?.data?.data[0]?.content.split("");
  const newArray = summaryContent.split("");

  // const handleClick = () => {
  //   dispatch(createDocumentsSummary(mattersInfo?.resources));
  // };
  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Typography className="paper-value-text">WorKFlow</Typography>
        <CustomPrimaryButton variant="contained" onClick={handleClick}>
          Workflow
        </CustomPrimaryButton> */}
      </Grid>
      {/* <Box
        sx={{
          minHeight: "100px",
          width: "77vw",
          border: "2px solid #DBDBDA",
          backgroundColor: "#FAFAF9",
          borderRadius: "7px",
          marginTop: "15px",
          padding: "12px 10px 10px 10px",
          overflow: "hidden",
        }}
      > */}
      <p
        className=""
        style={{
          display: "flex",
          // width: "75vw",
          wordBreak: "break-all",
          flexWrap: "nowrap",
          textWrap: "wrap",
          flexFlow: "wrap",
        }}
      >
        {newArray &&
          newArray.length &&
          newArray.map((element: any, index: number) => {
            const time = 100 * index;
            return (
              <AISummaryReport time={time} element={element} index={index} />
            );
          })}
      </p>
      {/* </Box> */}
    </>
  );
};

export default AISummary;

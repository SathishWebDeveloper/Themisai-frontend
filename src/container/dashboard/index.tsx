import AIassistedListofDatesEvents from "@assets/images/dashboard/AI-assisted-list-of-dates-events.svg";
import AnalysePDF from "@assets/images/dashboard/analyse-pdf.svg";
import ContractDraftingContractAnalysis from "@assets/images/dashboard/Contract-drafting-contract-analysis.svg";
import DraftTitleReport from "@assets/images/dashboard/Draft-title-report.svg";
import DraftWritPetitionsApplicationsSuits from "@assets/images/dashboard/Draft-writ-petitions-applications-suits.svg";
import SummariseDocuments from "@assets/images/dashboard/Summarise-documents.svg";
import FeaturesCard from "@components/featurecard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IFeatureCardData } from "src/types/dashboard";

const featuresCardData: IFeatureCardData[] = [
  {
    title: "Analyse your PDF",
    content:
      "Harness the power of AI to dissect PDFs, focusing on graphical data interpretation.",
    icons: AnalysePDF,
    rating: 8,
  },
  {
    title: "AI assisted List of Dates & Events",
    content:
      "Leverage AI to compile organized lists of dates and events, streamlining information retrieval.",
    icons: AIassistedListofDatesEvents,
    rating: 5,
  },
  {
    title: "Contract Drafting & Contract Analysis ",
    content:
      "Utilize AI for proficient drafting and meticulous analysis of contracts, optimizing legal processes?",
    icons: ContractDraftingContractAnalysis,
    rating: 7,
  },
  {
    title: "Draft Title Report",
    content:
      "Employ AI generate comprehensive reports summarizing essential details regarding property titles.",
    icons: DraftTitleReport,
    rating: 5,
  },
  {
    title: "Summarise Documents",
    content:
      "Harness AI for succinctly condensing lengthy documents, facilitating efficient information extraction.",
    icons: SummariseDocuments,
    rating: 7,
  },
  {
    title: "Draft Writ Petitions, applications and suits",
    content:
      "Utilize AI for crafting articulate writ petitions, applications, and suits, enhancing legal document preparation.",
    icons: DraftWritPetitionsApplicationsSuits,
    rating: 6,
  },
];

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Box
        sx={{
          fontSize: 30,
          fontFamily: "Manrope",
          fontWeight: "bold",
          color: "#000000",
          textAlign: "center",
          marginBottom: "30px",
          textTransform: "uppercase",
        }}
      >
        features
      </Box>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {featuresCardData.map((value, index) => {
          return (
            <Grid item xs={5} key={`${index}`}>
              <FeaturesCard
                title={value.title}
                content={value.content}
                icons={value.icons}
                rating={value.rating}
              />
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          sx={{ textAlign: "center", marginTop: "60px", color: "gray" }}
        >
          copyright &#169; 2024 themis.AI
        </Grid>
      </Grid>
    </Box>
  );
}

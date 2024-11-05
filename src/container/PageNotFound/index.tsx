/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Zeroimage from "../../assets/images/giphy.gif";
import "../../styles/scss/layouts/dashboard.scss";
import "../../styles/scss/layouts/pagenotFound.scss";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="pageContainer">
      <div className="childContainer">
        <div className="Pagetext">Sorry, Page Not</div>
        <div className="foundText">Found!</div>
        <div className="SubtextContainer">
          <div className="Subtext">
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </div>
        </div>
        <div className="imageContainer">
          <h1 className="pnf-text">
            4
            <span>
              <img src={Zeroimage} alt="Your GIF" style={{ width: "50%", height: "50%" }} />
            </span>
            4
          </h1>
        </div>

        <div className="buttonContainer">
          <Button
            variant="contained"
            className="buttonText"
            onClick={() => navigate("/dashboard")}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

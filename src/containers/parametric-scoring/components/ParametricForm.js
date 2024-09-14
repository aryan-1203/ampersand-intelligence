import React, { useState } from "react";
import { Button } from "reactstrap";
import { useRouter } from "next/router"; 
import Cookies from 'js-cookie'; 
import ParameterRow from "./ParameterRow";
import { parameters, subtexts } from "./constants";

const ParametricForm = ({ initialScores = parameters.map(() => 5), onSubmit, onBack, formData }) => {
  const [scores, setScores] = useState(initialScores);
  const router = useRouter(); 

  const handleSliderChange = (index, value) => {
    const updatedScores = [...scores];
    updatedScores[index] = value;
    setScores(updatedScores);
  };

  const mapScoresToPayload = (scores) => {
    return {
      "st_product_viability": scores[0],
      "st_financial_health": scores[1],
      "st_market_potential": scores[2],
      "st_sustainability": scores[3],
      "st_innovation": scores[4],
      "st_exit_potential": scores[5],
      "st_risk_factors": scores[6],
      "st_customer_traction": scores[7],
      "st_competitive_advantage": scores[8],
      "st_team_strength": scores[9],
      "is_active": true
    };
  };

  const handleCalculate = async () => {
    console.log("Selected scores:", scores);
    const payload = mapScoresToPayload(scores);
    Cookies.set("parametricScores", JSON.stringify(payload), { expires: 1 });
    console.log("Mapped payload:", payload);
    try {
      if (onSubmit) {
        onSubmit(payload); 
      }
      router.push("/report");
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <div className="parametric-scoring-container">
      <h3 className="parametric-title">Parametric Scoring</h3>
      <p className="parametric-subtitle">Use the slider and set the required field attributes</p>

      {parameters.map((param, index) => (
        <ParameterRow
          key={index}
          param={param}
          subtext={subtexts[index]}
          score={scores[index]}
          onSliderChange={(value) => handleSliderChange(index, value)}
        />
      ))}

      <div className="d-flex align-items-center mt-4" style={{ gap: "5px" }}>
      <Button
              type="button"
              // className="btn-dark w-100 mt-3"
              onClick={onBack}
              style={{
                width: "100%",
                height: "60px",
                color: "white",
                fontWeight: 300,
                backgroundColor: "#1d201f", 
                border: "1px solid #ADB8B34D", 
                boxShadow: "2px #1D201F", 
                transition: "background-color 0.3s, color 0.3s", 
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#1d201f";
                e.target.style.color = "white"; 
              }}
            >
              Back
            </Button>
        <Button
          type="submit"
          id="continue"
          className="btn-dark w-100"
          onClick={handleCalculate}
        >
          <span id="continuetext">Generate Report</span>
        </Button>
      </div>
    </div>
  );
};

export default ParametricForm;

import React, { useEffect, useState } from "react";
import RadarChart from "./RadarChart";
import { parameters } from "../../parametric-scoring/components/constants";

const Report = () => {
  const [scores, setScores] = useState(null);

  useEffect(() => {

    const fetchScores = async () => {
      try {
        const response = await fetch("https://ai.ampvc.co/api/v1/submit-all-forms/");
        const data = await response.json();

        if (data.parametric_scoring && data.parametric_scoring.length > 0) {
          const fetchedScores = data.parametric_scoring[0];
          const scoresArray = [
            fetchedScores.st_product_viability,
            fetchedScores.st_financial_health,
            fetchedScores.st_market_potential,
            fetchedScores.st_sustainability,
            fetchedScores.st_innovation,
            fetchedScores.st_exit_potential,
            fetchedScores.st_risk_factors,
            fetchedScores.st_customer_traction,
            fetchedScores.st_competitive_advantage,
            fetchedScores.st_team_strength
          ];

          setScores(scoresArray);
        } else {
          console.error("No parametric scoring data found");
        }
      } catch (error) {
        console.error("Error fetching parametric scoring from API:", error);
      }
    };

    fetchScores();
  }, []);

  if (scores === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="report-container">
      <RadarChart scores={scores} parameters={parameters} />
    </div>
  );
};

export default Report;

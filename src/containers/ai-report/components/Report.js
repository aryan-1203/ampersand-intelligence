import React, { useEffect, useState } from "react";
import RadarChart from "./RadarChart";
import { parameters } from "../../parametric-scoring/components/constants";

const Report = () => {
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subtextIndex, setSubtextIndex] = useState(0);
  const [showChart, setShowChart] = useState(false); // New state to handle showing the chart

  const subtexts = [
    "Initializing data fetch...",
    "Running analysis...",
    "Generating RadarChart data...",
    "Ampersand algorithm is working..."
  ];

  useEffect(() => {
    // Change the subtexts every 1 second
    const interval = setInterval(() => {
      setSubtextIndex((prevIndex) => (prevIndex + 1) % subtexts.length);
    }, 3000);

    const fetchScores = async () => {
      try {
        const response = await fetch("https://ai.ampvc.co/api/v1/submit-all-forms");
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
          setLoading(false); // Set loading to false once data is fetched
        } else {
          console.error("No parametric scoring data found");
        }
      } catch (error) {
        console.error("Error fetching parametric scoring from API:", error);
      }
    };

    fetchScores();
    const timeout = setTimeout(() => {
      setShowChart(true);
    }, 12000); 

    return () => {
      clearInterval(interval); // Cleanup interval
      clearTimeout(timeout); // Cleanup timeout
    };
  }, []);

  // Show loading animation if the chart is not ready
  if (!showChart) {
    return (
      <div className="loading-container">
        <img src="image/reportLoader.jpg" alt="Background" className="background-image" /> {/* Display background image */}
        <div className="overlay-content">
          <div className="company-logo">
            <img src="image/logo-white.png" alt="Company Logo" />
          </div>
          <div className="loading-text">{subtexts[subtextIndex]}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-container">
      <RadarChart scores={scores} parameters={parameters} />
    </div>
  );
};

export default Report;

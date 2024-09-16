import React, { useEffect, useState } from "react";


const OverviewFundingCards = () => {
  const [overviewData, setOverviewData] = useState({});
  const [fundingData, setFundingData] = useState({});

  const fetchFormData = async () => {
    try {
      const response = await fetch("https://www.ai.ampvc.co/api/v1/submit-all-forms");
      const data = await response.json();

      if (data.company_overview) {
        setOverviewData(data.company_overview);
      }

      if (data.funding_valuation && data.funding_valuation.length > 0) {
        setFundingData(data.funding_valuation[0]);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <div className="of-grid">
      <div className="of-card">
        <p id="report-h">Company Name</p>
        <p id="report-p">{overviewData.st_company_name || "Ampersand Inc"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Industry</p>
        <p id="report-p">{overviewData.st_industry_type || "Tech"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Location</p>
        <p id="report-p">{overviewData.st_country || "USA"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Business Model</p>
        <p id="report-p">{overviewData.st_geography || "B2B"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Year Founded</p>
        <p id="report-p">{overviewData.st_year_of_incorporation || "2020"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Stage</p>
        <p id="report-p">{fundingData.st_stage || "Seed"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Raised to Date</p>
        <p id="report-p">{fundingData.st_currency} {fundingData.st_raised_to_date || "20 K"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Last Valuation</p>
        <p id="report-p">{fundingData.st_currency} {fundingData.st_last_valuation || "1.4 Mn"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Current Valuation</p>
        <p id="report-p">{fundingData.st_currency} {fundingData.st_current_valuation || "2.0 Mn"}</p>
      </div>
      <div className="of-card">
        <p id="report-h">Capital Requirements</p>
        <p id="report-p">{fundingData.st_currency} {fundingData.st_capital_requirements || "500 K"}</p>
      </div>
    </div>
  );
};

export default OverviewFundingCards;

import React, { useEffect, useState } from 'react';

const parameters = [
  'Product Viability',
  'Financial Health',
  'Market Potential',
  'Sustainability',
  'Innovation',
  'Exit Potential',
  'Risk Factors',
  'Customer Traction',
  'Competitive Advantage',
  'Team Strength'
];

function ParameterLevelComponent() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchParametricScores = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/submit-all-forms');
        const data = await response.json();
        if (data.parametric_scoring && data.parametric_scoring.length > 0) {
          const fetchedLevels = data.parametric_scoring[0];
          const levelsArray = [
            fetchedLevels.st_product_viability,
            fetchedLevels.st_financial_health,
            fetchedLevels.st_market_potential,
            fetchedLevels.st_sustainability,
            fetchedLevels.st_innovation,
            fetchedLevels.st_exit_potential,
            fetchedLevels.st_risk_factors,
            fetchedLevels.st_customer_traction,
            fetchedLevels.st_competitive_advantage,
            fetchedLevels.st_team_strength
          ];

          setLevels(levelsArray);
        } else {
          console.error('No parametric scoring data found');
          setLevels([]); 
        }
      } catch (error) {
        console.error('Error fetching parametric scores from API:', error);
        setLevels([]); 
      }
    };
    fetchParametricScores();
  }, []);

  return (
    <section className="uniqueContainer">
      <header className="uniqueHeader">
        <div className="uniqueParameter">Parameter</div>
        <div className="uniqueLevel">Level</div>
      </header>
      <hr className="uniqueDivider" />
      <div className="uniqueContent">
        <div className="uniqueParameterList">
          {parameters.map((param, index) => (
            <p id='investmentgrid' key={index} className="uniqueItem">{param}</p>
          ))}
        </div>
        <div className="uniqueLevelList">
          {levels.length > 0 ? (
            levels.map((level, index) => (
              <p id='numberinvestmentgrid' key={index} className="uniqueItem">{level}</p>
            ))
          ) : (
            <p>No levels data available</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ParameterLevelComponent;

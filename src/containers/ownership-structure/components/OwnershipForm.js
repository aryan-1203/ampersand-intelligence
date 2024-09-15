import React, { useState } from "react";
import { Button } from "reactstrap";
import ShareholderRow from "./ShareholderRow";
import OwnershipBar from "./OwnershipBar";
import Cookies from "js-cookie";
import { shareholderOptions } from "./shareholderOptions";
import { useFormik } from "formik";

const OwnershipForm = ({ companyId, onNext, onBack }) => {
  const [shareholders, setShareholders] = useState([{ type: "", name: "", percentage: "", is_active: true }]);
  
  const getSelectedTypes = () => {
    return shareholders.map((shareholder) => shareholder.type);
  };

  const getAvailableOptions = (currentType) => {
    const selectedTypes = getSelectedTypes();
    return shareholderOptions.filter(
      (option) => option.value === currentType || !selectedTypes.includes(option.value)
    );
  };

  const handleInputChange = (index, field, value) => {
    const updatedShareholders = [...shareholders];
    updatedShareholders[index][field] = value;
    setShareholders(updatedShareholders);
  };

  const addShareholder = () => {
    const newShareholder = { type: "", name: "", percentage: "", is_active: true };
    const updatedShareholders = [...shareholders, newShareholder];
    setShareholders(updatedShareholders);
  };

  const getTotalPercentage = () =>
    shareholders.reduce((acc, curr) => acc + Number(curr.percentage || 0), 0);
  
  const getRemainingPercentage = (index) => {
    const usedPercentage = shareholders
      .slice(0, index)
      .reduce((acc, curr) => acc + Number(curr.percentage || 0), 0);
    return Math.max(100 - usedPercentage, 0);
  };

  const saveDataToCookies = () => {
    const formattedShareholders = shareholders.map((shareholder) => ({
      st_type: shareholder.type,
      st_shareholder_name: shareholder.name,
      st_holding_percentage: Number(shareholder.percentage), 
      is_active: shareholder.is_active
    }));
    
    Cookies.set("shareholders", JSON.stringify(formattedShareholders), { expires: 10 / 1440 }); 
  };
  

  const handleContinue = () => {
    saveDataToCookies(); 
    const storedShareholders = Cookies.get("shareholders");
    if (storedShareholders) {
      const parsedShareholders = JSON.parse(storedShareholders);
      onNext(parsedShareholders); 
    }
  };
  

  const totalPercentage = getTotalPercentage();
  const shouldHideAddButton = getSelectedTypes().length >= shareholderOptions.length || getTotalPercentage() >= 100;

  return (
    <div className="ownership-structure-container">
      <h3 className="ownership-title">Ownership Structure</h3>
      <p className="ownership-subtitle">Get started by filling the form below</p>

      <OwnershipBar shareholders={shareholders} />

      <div className="label-row" style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
        <div className="label-row" style={{ marginLeft: "5px", flex: 3.5, marginBottom: "10px" }}>Type</div>
        <div className="label-row" style={{ flex: 5.5 }}>Shareholder Name</div>
        <div className="label-row" style={{ flex: 1.5 }}>Holding (%)</div>
      </div>

      {shareholders.map((shareholder, index) => (
        <ShareholderRow
          key={index}
          index={index}
          shareholder={shareholder}
          handleInputChange={handleInputChange}
          availableOptions={getAvailableOptions(shareholder.type)}
          hasError={shareholder.hasError}
          placeholder={getRemainingPercentage(index)} 
        />
      ))}

{!shouldHideAddButton && (
          <button type="button" onClick={addShareholder} className="add-shareholder-button">
            + Add a Shareholder
          </button>
        )}

      {totalPercentage > 100 && (
        <div className="error-message-container">
          <img src="image/alert-circle.png" alt="Warning" className="warning-icon" />
          <p className="error-message-text">The total holding percentage cannot exceed 100%.</p>
        </div>
      )}

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
          onClick={handleContinue}
          type="submit"
          id="continue"
          className="btn-dark w-100"
          disabled={totalPercentage !== 100}
          style={{
            backgroundColor: totalPercentage === 100 ? "#c7f83f" : "#6c757d", 
            cursor: totalPercentage === 100 ? "pointer" : "not-allowed"
          }}
        >
          <span id="continuetext">Continue</span>
        </Button>
      </div>
    </div>
  );
};

export default OwnershipForm;

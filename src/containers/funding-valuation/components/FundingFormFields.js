import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const CurrencySelect = ({ id, name, value, onChange, error }) => (
  <div style={{ position: "relative", maxWidth: "88px", width: "100%" }}>
    <select
      className={`form-control ${error ? "border-danger" : ""}`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: "100%", paddingRight: "30px" }}
    >
      {["USD", "EUR", "INR", "AED", "CAD", "GBP"].map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
    <img
      src="image/Vector.png"
      alt="Dropdown"
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        height: "8px",
        width: "13px",
      }}
    />
  </div>
);

const AmountUnitSelect = ({ id, name, value, onChange, error }) => (
  <div
    style={{
      position: "absolute",
      right: "0",
      top: "0",
      height: "100%",
      display: "flex",
      alignItems: "center",
    }}
  >
    <select
      className={`form-control ${error ? "border-danger" : ""}`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      style={{ height: "100%", width: "78px", paddingRight: "30px" }}
    >
      {["K", "Mn"].map((unit) => (
        <option key={unit} value={unit}>
          {unit}
        </option>
      ))}
    </select>
    <img
      src="image/Vector.png"
      alt="Dropdown"
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        height: "8px",
        width: "13px",
      }}
    />
  </div>
);

const FundingFormFields = ({ formik }) => (
  <div>
    <FormGroup className="form-group">
      <Label className="overview-form-labels" for="st_stage">
        Stage
      </Label>
      <div className="custom-select-wrapper">
        <select
          id="st_stage"
          className={`form-control ${
            formik.errors.st_stage ? "border-danger" : ""
          }`}
          name="st_stage"
          value={formik.values.st_stage}
          onChange={formik.handleChange}
        >
          {[
            "Select Stage",
            "Pre-Seed",
            "Seed",
            "Bridging",
            "Series A",
            "Series B",
            "Secondary",
            "Venture Debt",
          ].map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        <span className="dropdown-icon">
          <img src="image/Vector.png" alt="Dropdown" />
        </span>
      </div>
      <FormFeedback className="d-block">{formik.errors.st_stage}</FormFeedback>
    </FormGroup>
    <div className="grid-container">
      <FormGroup className="form-group">
        <Label className="overview-form-labels" for="capitalRequirements">
          Capital Requirements
        </Label>
        <div className="fundingFormcr d-flex align-items-start" style={{ gap: "5px" }}>
        <CurrencySelect
          id="currency"
          name="st_currency"
          value={formik.values.st_currency}
          onChange={formik.handleChange}
          error={formik.errors.st_currency}
        />
          <div
            className="capitalRequirements"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              className={`form-control ${
                formik.errors.st_capital_requirements ? "border-danger" : ""
              }`}
              id="st_capital_requirements"
              type="text"
              placeholder="Enter amount"
              name="st_capital_requirements"
              value={formik.values.st_capital_requirements}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ paddingRight: "80px" }}
            />
            <AmountUnitSelect
              id="cramountUnit"
              name="cramountUnit"
              value={formik.values.cramountUnit}
              onChange={formik.handleChange}
              error={formik.errors.amountUnit}
            />
          </div>
        </div>
        {formik.errors.crcurrency && (
          <FormFeedback className="d-block">
            {formik.errors.crcurrency}
          </FormFeedback>
        )}
        {formik.errors.st_capital_requirements && (
          <FormFeedback className="d-block">
            {formik.errors.st_capital_requirements}
          </FormFeedback>
        )}
        {formik.errors.amountUnit && (
          <FormFeedback className="d-block">
            {formik.errors.amountUnit}
          </FormFeedback>
        )}
      </FormGroup>
      <FormGroup className="form-group">
        <Label className="overview-form-labels" for="currentValuation">
          Current Valuation
        </Label>
        <div className="d-flex align-items-start" style={{ gap: "5px" }}>
          <div
            className="currentValuation"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              className={`form-control ${
                formik.errors.st_current_valuation ? "border-danger" : ""
              }`}
              id="st_current_valuation"
              type="text"
              placeholder="Enter Amount"
              name="st_current_valuation"
              value={formik.values.st_current_valuation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ paddingRight: "80px" }}
            />
            <AmountUnitSelect
              id="cvamountUnit"
              name="cvamountUnit"
              value={formik.values.cvamountUnit}
              onChange={formik.handleChange}
              error={formik.errors.cvamountUnit}
            />
          </div>
        </div>
        {formik.errors.st_current_valuation && (
          <FormFeedback className="d-block">
            {formik.errors.st_current_valuation}
          </FormFeedback>
        )}
        {formik.errors.cvamountUnit && (
          <FormFeedback className="d-block">
            {formik.errors.cvamountUnit}
          </FormFeedback>
        )}
      </FormGroup>
    </div>
    <div className="grid-container">
      <FormGroup className="form-group">
        <Label className="overview-form-labels" for="raisedToDate">
          Raised to Date
        </Label>
          <div
            className="st_raised_to_date"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              className={`form-control ${
                formik.errors.st_raised_to_date ? "border-danger" : ""
              }`}
              id="st_raised_to_date"
              type="text"
              placeholder="Enter amount"
              name="st_raised_to_date"
              value={formik.values.st_raised_to_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ paddingRight: "80px" }}
            />
            <AmountUnitSelect
              id="amountUnit"
              name="amountUnit"
              value={formik.values.amountUnit}
              onChange={formik.handleChange}
              error={formik.errors.amountUnit}
            />
          </div>
        {formik.errors.currency && (
          <FormFeedback className="d-block">
            {formik.errors.currency}
          </FormFeedback>
        )}
        {formik.errors.st_raised_to_date && (
          <FormFeedback className="d-block">
            {formik.errors.st_raised_to_date}
          </FormFeedback>
        )}
        {formik.errors.amountUnit && (
          <FormFeedback className="d-block">
            {formik.errors.amountUnit}
          </FormFeedback>
        )}
      </FormGroup>
      <FormGroup className="form-group">
        <Label className="overview-form-labels" for="lastValuation">
          Last Valuation
        </Label>
        <div className="d-flex align-items-start" style={{ gap: "5px" }}>
          <div
            className="lastValuation"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              className={`form-control ${
                formik.errors.st_last_valuation ? "border-danger" : ""
              }`}
              id="st_last_valuation"
              type="text"
              placeholder="Enter Amount"
              name="st_last_valuation"
              value={formik.values.st_last_valuation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ paddingRight: "80px" }}
            />
            <AmountUnitSelect
              id="lvamountUnit"
              name="lvamountUnit"
              value={formik.values.lvamountUnit}
              onChange={formik.handleChange}
              error={formik.errors.lvamountUnit}
            />
          </div>
        </div>
        {formik.errors.lvcurrency && (
          <FormFeedback className="d-block">
            {formik.errors.lvcurrency}
          </FormFeedback>
        )}
        {formik.errors.st_last_valuation && (
          <FormFeedback className="d-block">
            {formik.errors.st_last_valuation}
          </FormFeedback>
        )}
        {formik.errors.lvamountUnit && (
          <FormFeedback className="d-block">
            {formik.errors.lvamountUnit}
          </FormFeedback>
        )}
      </FormGroup>
    </div>
  </div>
);

export default FundingFormFields;

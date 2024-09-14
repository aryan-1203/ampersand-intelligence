import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Form,
  FormFeedback,
  FormGroup,
  Label,
} from "reactstrap";
import { countries } from "./countries";
import { validationSchema } from "./validationSchema";
import {
  years,
  totalFoundersOptions,
  employeesOptions,
  industryOptions,
  geographyOptions,
} from "./dropdownOptions";
import Cookies from "js-cookie";

const OverviewForm = ({ data, onNext }) => {
  const [formMessage, setFormMessage] = useState(null);
  const [submitForm, setSubmitForm] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [founderNames, setFounderNames] = useState(data.founderNames || []); 
  const [currentInput, setCurrentInput] = useState("");

  const handleSelectChange = (e) => {
    formik.handleChange(e);
    setIsOptionSelected(e.target.value !== ""); 
  };

  const handleFounderNameKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      if (currentInput.trim() !== "") {
        const newFounderNames = [...founderNames, currentInput.trim()];
        setFounderNames(newFounderNames);
        formik.setFieldValue('founderNames', newFounderNames); // Update Formik's field value
        setCurrentInput(""); 
      }
    }
  };
  const removeName = (indexToRemove) => {
    const updatedFounderNames = founderNames.filter((_, index) => index !== indexToRemove);
    setFounderNames(updatedFounderNames);
    formik.setFieldValue('founderNames', updatedFounderNames); // Update Formik's field value
  };

  const formik = useFormik({
    initialValues: {
      ...data,
      founderNames: data.founderNames || [], // Ensure `founderNames` is initialized
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      values.st_founder_names = founderNames.join(", ");
      Cookies.set("overviewFormData", JSON.stringify(values));
      console.log(
        "Form data stored in cookies:",
        Cookies.get("overviewFormData")
      );
      onNext(values);
    },
  });

  return (
    <Card>
      <CardBody>
        <h3 className="overview-form-title">Company Overview</h3>
        <p className="overview-form-subtitle">
          Get started by filling the form below
        </p>
        {formMessage && (
          <Alert color={formMessage.type}>{formMessage.message}</Alert>
        )}
        {submitForm && <Alert color="success">{submitForm.message}</Alert>}

        <Form onSubmit={formik.handleSubmit} noValidate>
          <FormGroup>
            <Label className="overview-form-labels" for="st_company_name">
              Company Name
            </Label>
            <input
              className={`form-control ${
                formik.errors.st_company_name ? "border-danger" : ""
              }`}
              name="st_company_name"
              value={formik.values.st_company_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ampersand Inc."
            />
            <FormFeedback className="d-block">
              {formik.errors.st_company_name}
            </FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label className="overview-form-labels" for="st_company_description">
              Company Description
            </Label>
            <textarea
              className={`form-control ${
                formik.errors.st_company_description ? "border-danger" : ""
              }`}
              name="st_company_description"
              id="st_company_description"
              value={formik.values.st_company_description}
              onChange={formik.handleChange}
              placeholder="Write a short description"
              rows={2}
            />
            <FormFeedback className="d-block">
              {formik.errors.st_company_description}
            </FormFeedback>
          </FormGroup>

          <div className="grid-container">
            <FormGroup className="form-group">
              <Label className="overview-form-labels" for="st_year_of_incorporation">
                Year of Incorporation
              </Label>
              <div className="input-group">
                <span className="input-group-prepend">
                  <img
                    src="image/calendar.png"
                    alt="Calendar"
                    className="calendar-icon"
                  />
                </span>
                <span className="divider"></span>
                <select
                  id="st_year_of_incorporation"
                  className={`form-control ${
                    formik.errors.st_year_of_incorporation ? "border-danger" : ""
                  }`}
                  name="st_year_of_incorporation"
                  value={formik.values.st_year_of_incorporation}
                  onChange={handleSelectChange}
                >
                  <option value="">YYYY</option> 
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <span className="dropdown-icon">
                  <img src="image/Vector.png" alt="Dropdown" />
                </span>
              </div>
              <FormFeedback className="d-block">
                {formik.errors.st_year_of_incorporation}
              </FormFeedback>
            </FormGroup>

            <FormGroup className="form-group">
              <Label className="overview-form-labels" for="st_country">
                Country
              </Label>
              <div className="custom-select-wrapper">
                <select
                  className={`form-control ${
                    formik.errors.st_country ? "border-danger" : ""
                  }`}
                  id="st_country"
                  name="st_country"
                  value={formik.values.st_country}
                  onChange={handleSelectChange}
                >
                  <option value="">Select a country</option>
                  {countries.map((st_country, index) => (
                    <option key={index} value={st_country}>
                      {st_country}
                    </option>
                  ))}
                </select>
                <span className="dropdown-icon">
                  <img src="image/Vector.png" alt="Dropdown" />
                </span>
              </div>
              <FormFeedback className="d-block">
                {formik.errors.st_country}
              </FormFeedback>
            </FormGroup>

            <FormGroup className="form-group">
              <Label className="overview-form-labels" for="st_total_founders">
                Total Founders
              </Label>
              <div className="custom-select-wrapper">
                <select
                  id="st_total_founders"
                  className={`form-control ${
                    formik.errors.st_total_founders ? "border-danger" : ""
                  }`}
                  name="st_total_founders"
                  value={formik.values.st_total_founders}
                  onChange={handleSelectChange}
                >
                  <option value="">Select number of founders</option>{" "}
                  {totalFoundersOptions}
                </select>
                <span className="dropdown-icon">
                  <img src="image/Vector.png" alt="Dropdown" />
                </span>
              </div>
              <FormFeedback className="d-block">
                {formik.errors.st_total_founders}
              </FormFeedback>
            </FormGroup>

            <FormGroup className="form-group">
              <Label className="overview-form-labels" for="st_no_of_employees">
                Number of Employees
              </Label>
              <div className="custom-select-wrapper">
                <select
                  id="st_no_of_employees"
                  className={`form-control ${
                    formik.errors.st_no_of_employees ? "border-danger" : ""
                  }`}
                  name="st_no_of_employees"
                  value={formik.values.st_no_of_employees}
                  onChange={handleSelectChange}
                >
                  <option value="">Select number of employees</option>{" "}
                  {employeesOptions}
                </select>
                <span className="dropdown-icon">
                  <img src="image/Vector.png" alt="Dropdown" />
                </span>
              </div>
              <FormFeedback className="d-block">
                {formik.errors.st_no_of_employees}
              </FormFeedback>
            </FormGroup>
          </div>

          <FormGroup className="form-group">
            <Label className="overview-form-labels" for="founderNames">
              Name of the Founder / Co-Founders
            </Label>
            <div className="founder-names-input-wrapper">
              <div className="founder-names-container">
                {founderNames.map((name, index) => (
                  <div key={index} className="founder-name-card">
                    {name}
                    <button
                      type="button"
                      className="remove-name-btn"
                      onClick={() => removeName(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                 className={`founder-input form-control ${
                  formik.errors.founderNames ? 'border-danger' : ''
                }`}
                type="text"
                placeholder="Type and press Enter"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleFounderNameKeyPress}
              />
            </div>
            <FormFeedback className="d-block">
              {formik.errors.founderNames}
            </FormFeedback>
          </FormGroup>
          <div className="grid-container">
            <FormGroup className="form-group">
              <Label className="overview-form-labels" for="st_industry_type">
                Industry Type
              </Label>
              <div className="custom-select-wrapper">
                <select
                  id="st_industry_type"
                  className={`form-control ${
                    formik.errors.st_industry_type ? "border-danger" : ""
                  }`}
                  name="st_industry_type"
                  value={formik.values.st_industry_type}
                  onChange={handleSelectChange}
                >
                  <option value="">Select an industry</option> {industryOptions}
                </select>
                <span className="dropdown-icon">
                  <img src="image/Vector.png" alt="Dropdown" />
                </span>
              </div>
              <FormFeedback className="d-block">
                {formik.errors.st_industry_type}
              </FormFeedback>
            </FormGroup>

            <FormGroup className="form-group">
              <Label className="overview-form-labels" for="st_geography">
                Geography
              </Label>
              <div className="custom-select-wrapper">
                <select
                  id="st_geography"
                  className={`form-control ${
                    formik.errors.st_geography ? "border-danger" : ""
                  }`}
                  name="st_geography"
                  value={formik.values.st_geography}
                  onChange={handleSelectChange}
                >
                  <option value="">Select geography</option> {/* Placeholder */}
                  {geographyOptions}
                </select>
                <span className="dropdown-icon">
                  <img src="image/Vector.png" alt="Dropdown" />
                </span>
              </div>
              <FormFeedback className="d-block">
                {formik.errors.st_geography}
              </FormFeedback>
            </FormGroup>
          </div>
          <Button type="submit" id="continue" className="btn-dark w-100 mt-3">
            <span id="continuetext">Continue</span>
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default OverviewForm;

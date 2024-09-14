import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Form, Alert } from "reactstrap";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import FundingFormFields from "./FundingFormFields";
import { validationSchema } from "./validationSchema";

const FundingForm = ({ data, onNext, onBack }) => {
  const [formMessage, setFormMessage] = useState(null);
  const [submitForm, setSubmitForm] = useState(null);
  
  const formik = useFormik({
    initialValues: {
      st_stage: data.st_stage || "",
      st_raised_to_date: data.st_raised_to_date || "",
      st_currency: data.st_currency || "USD",
      st_last_valuation: data.st_last_valuation || "",
      st_current_valuation: data.st_current_valuation || "",
      st_capital_requirements: data.st_capital_requirements || "",
      amountUnit: data.amountUnit || "Th",  
      lvamountUnit: data.lvamountUnit || "Th",  
      cvamountUnit: data.cvamountUnit || "Th",  
      cramountUnit: data.cramountUnit || "Th",  
    },    
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const formattedValues = {
        st_stage: values.st_stage,
        st_raised_to_date: `${values.st_raised_to_date} ${values.amountUnit}`, 
        st_last_valuation: `${values.st_last_valuation} ${values.lvamountUnit}`, 
        st_current_valuation: `${values.st_current_valuation} ${values.cvamountUnit}`,
        st_capital_requirements: `${values.st_capital_requirements} ${values.cramountUnit}`,
        st_currency: values.st_currency, 
        is_active: true 
      };

      Cookies.set('fundingValuationFormData', JSON.stringify(formattedValues));
      console.log('Form data stored in cookies:', Cookies.get('fundingValuationFormData'));
      
      onNext(formattedValues);  
    },
  });

  return (
    <Card>
      <CardBody>
        <h3 className="overview-form-title">Funding & Valuation</h3>
        <p className="overview-form-subtitle">Enter the details below</p>

        {formMessage && (
          <div className="mt-4">
            <Alert color="danger">{formMessage.message}</Alert>
          </div>
        )}
        {submitForm && (
          <div className="mt-4">
            <Alert color="success">{submitForm.message}</Alert>
          </div>
        )}

        <Form onSubmit={formik.handleSubmit} noValidate>
          <FundingFormFields formik={formik} />
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
                backgroundColor: "#1d201f", // Initial background color
                border: "1px solid #ADB8B34D", // Optional border
                boxShadow: "2px #1D201F", // Optional shadow
                transition: "background-color 0.3s, color 0.3s", // Smooth transition
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
              onClick={() => {
                formik.validateForm().then((errors) => {
                  if (Object.keys(errors).length === 0) {
                    formik.handleSubmit();
                    onNext(formik.values);
                  } else {
                    formik.setTouched({
                      stage: true,
                      raisedToDate: true,
                      lastValuation: true,
                      currentValuation: true,
                      capitalRequirements: true,
                    });
                  }
                });
              }}
              type="button"
              id="continue"
              className="btn-dark w-100 "
              
            >
              <span id="continuetext">Continue</span>
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default FundingForm;

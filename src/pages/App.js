import React, { useState } from "react";
import { useRouter } from "next/router";
import OverviewForm from "../containers/company-overview/components/overviewForm";
import FundingForm from "../containers/funding-valuation/components/FundingForm";
import OwnershipForm from "../containers/ownership-structure/components/OwnershipForm";
import ParametricForm from "../containers/parametric-scoring/components/ParametricForm";
import Head from "next/head";
import Link from "next/link";
import { Col, Row } from "reactstrap";
import Sidebar from "../components/sidebar/sidebar";
import axios from "axios";
import Report from "../containers/ai-report/components/Report";
import api from "api/api";
import Cookies from "js-cookie";

const App = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company_overview: {
      st_company_name: "",
      st_company_description: "",
      st_year_of_incorporation: "",
      st_country: "",
      st_total_founders: "",
      st_no_of_employees: "",
      st_founder_names: "",
      st_industry_type: "",
      st_geography: "",
      is_active: true,
    },
    funding_valuation: {
      st_stage: "",
      st_raised_to_date: "",
      st_last_valuation: "",
      st_current_valuation: "",
      st_capital_requirements: "",
      st_currency: "USD",
      is_active: true,
    },
    ownership_structure: [],
    parametric_scoring: {
      st_product_viability: 0,
      st_financial_health: 0,
      st_market_potential: 0,
      st_sustainability: 0,
      st_innovation: 0,
      st_exit_potential: 0,
      st_risk_factors: 0,
      st_customer_traction: 0,
      st_competitive_advantage: 0,
      st_team_strength: 0,
      is_active: true,
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

 const handleFinalSubmit = async (payload) => {
    try {
      console.log("Submitting Payload:", payload);
      const response = await fetch("https://www.ai.ampvc.co/api/v1/submit-all-forms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error submitting form", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const handleParametricSubmit = () => {
    const cookieData = Cookies.get("parametricScores");
    let parametricPayload = formData.parametric_scoring;
    if (cookieData) {
      const parsedScores = JSON.parse(cookieData);
      console.log("Parsed parametric scores from cookies:", parsedScores);
      parametricPayload = {
        ...formData.parametric_scoring,
        ...parsedScores,
      };
    }
    const finalPayload = {
      ...formData, 
      parametric_scoring: parametricPayload,
    };
    console.log("Final Payload for API:", finalPayload);
    handleFinalSubmit(finalPayload);
  };

  const renderForm = () => {
    if (router.pathname === "/report") {
      return <Report />;
    }
    switch (currentStep) {
      case 1:
        return (
          <OverviewForm
            data={formData.company_overview}
            onNext={(data) => {
              updateFormData("company_overview", data);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <FundingForm
            data={formData.funding_valuation}
            onBack={() => setCurrentStep(1)}
            onNext={(data) => {
              updateFormData("funding_valuation", data);
              setCurrentStep(3);
            }}
          />
        );
      case 3:
        return (
          <OwnershipForm
            data={formData.ownership_structure}
            onBack={() => setCurrentStep(2)}
            onNext={(data) => {
              updateFormData("ownership_structure", data);
              setCurrentStep(4);
            }}
          />
        );
      case 4:
        return (
          <ParametricForm
            data={formData.parametric_scoring}
            onBack={() => setCurrentStep(3)}
            onSubmit={handleParametricSubmit}
          />
        );
      default:
        return null;
    }
  };

  const getImageSrc = () => {
    switch (currentStep) {
      case 1:
        return "image/overview.png";
      case 2:
        return "image/funding.png";
      case 3:
        return "image/ownership.png";
      case 4:
        return "image/parametric.png";
      default:
        return "none";
    }
  };

  return (
    <>
      <Head>
        <title>Ampersand Intelligence</title>
      </Head>
      <section className="section">
        <div className="grain-container">
          <img id="grain" src="image/Rectangle.png" alt="Background Texture" />
        </div>
        <div className="company-overview-page">
          <Row className="header-row mx-0 align-items-center">
            <Col className="company-overview-col" xs={4} lg={2}>
              <Link className="d-inline-block" href="/">
                <img className="d-none d-lg-block" src="image/logo-white.png" />
                <img className="d-lg-none d-block" src="image/logo-white.png" />
              </Link>
            </Col>
            <Col className="empty-col d-none d-lg-block" lg={6}></Col>
            <Col xs={8} className="company-email-col" lg={3}>
              <a href="/">
                <span>Ampersand Intelligence</span>
              </a>
            </Col>
          </Row>
          <Row className="mx-0 w-100 content-row">
            <Col className="contact-content-col px-0" lg={2}>
              <Sidebar activeStep={currentStep} />
            </Col>
            <Col
              className="contact-form-col d-flex justify-content-start "
              lg={7}
            >
              <div className="contact-content-form w-100">
                <div className="contact-form-center">{renderForm()}</div>
              </div>
            </Col>
            <Col className="reach-out-col px-0" lg={3} md={3} xs={12}>
              <div className="reach-out-content">
                <img
                  className="reach-out-image"
                  src={getImageSrc()}
                  alt="Form Image"
                />
              </div>
            </Col>
          </Row>
          <div>
            <img className="gradient" src="image/gradient.png" />
          </div>
        </div>
      </section>
    </>
  );
};

export default App;

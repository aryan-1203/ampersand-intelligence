import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import Link from "next/link";
import Head from "next/head";
import Sidebar from "../../components/sidebar/sidebar";
import OverviewFundingCards from "./components/OverviewFundingCards";
import OwnershipBar from "../ownership-structure/components/OwnershipBar";
import Cookies from "js-cookie";
import Report from "./components/Report";
import { shareholderOptions } from "../ownership-structure/components/shareholderOptions";
import ParameterLevelComponent from "./components/InvestmentReadiness";
import InvestmentReadiness from "./components/UniqueInvestmentReadiness";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import VideoAnimation from "./components/VideoAnimation";

const ReportPage = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(5);
  const [companyDescription, setCompanyDescription] = useState("");
  const [shareholders, setShareholders] = useState([]);
  const [overviewData, setOverviewData] = useState({});
  const [companyId, setCompanyId] = useState("");

  const fetchFormData = async () => {
    try {
      const response = await fetch("http://3.110.177.173:2001/submit-all-forms");
      const data = await response.json();
      if (data.company_overview) {
        setCompanyDescription(
          data.company_overview.st_company_description ||
            "No description available"
        );
        setOverviewData(data.company_overview);
        setCompanyId(data.st_company_id);
      }
      if (data.ownership_structure) {
        const formattedShareholders = data.ownership_structure.map(
          (shareholder) => ({
            type: shareholder.st_type,
            percentage: shareholder.st_holding_percentage,
            name: shareholder.st_shareholder_name,
          })
        );
        setShareholders(formattedShareholders);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const handleAnimationEnd = () => {
    setIsAnimationComplete(true);
  };

  const handleDownload = () => {
    const sidebarElement = document.querySelector(".contact-content-col");
    const shareButton = document.querySelector(".report-button");
    const reachOutElement = document.querySelector(".reach-out-col");
    if (sidebarElement) {
      sidebarElement.style.display = "none";
    }

    if (shareButton) {
      shareButton.style.display = "none";
    }

    if (reachOutElement) {
      reachOutElement.style.display = "none";
    }

    const element = document.querySelector(".company-overview-page");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("report.pdf");

      if (sidebarElement) {
        sidebarElement.style.display = "block";
      }

      if (shareButton) {
        shareButton.style.display = "block";
      }

      if (reachOutElement) {
        reachOutElement.style.display = "block";
      }
    });
    Cookies.remove("overviewFormData");
    Cookies.remove("shareholders");
    Cookies.remove("fundingValuationFormData");
    Cookies.remove("parametricScores");
  };

  return (
    <>
      <Head>
        <title>Ampersand Report</title>
      </Head>
      {!isAnimationComplete && (
        <VideoAnimation onAnimationEnd={handleAnimationEnd} />
      )}
      {isAnimationComplete && (
        <section className="section">
          <div className="grain-container">
            <img
              id="grain"
              src="image/Rectangle.png"
              alt="Background Texture"
            />
          </div>
          <div className="company-overview-page">
            <Row className="header-row mx-0 align-items-center">
              <Col className="company-overview-col" xs={4} lg={2}>
                <Link className="d-inline-block" href="/">
                  <img
                    className="d-none d-lg-block"
                    src="image/logo-white.png"
                  />
                  <img
                    className="d-lg-none d-block"
                    src="image/logo-white.png"
                  />
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
                  <div
                    className=" contact-form-center"
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="report-heading">
                          <div className="title-section">
                            <h2>
                              AI Report <span className="icon">✦</span>
                            </h2>
                            <p>Generated by Ampersand Proprietary Algorithm</p>
                          </div>
                          <div className="company-code">
                            <p>Company code</p>
                            <p className="code">#AMP00{companyId}</p>
                          </div>
                        </div>
                        <div className="report-companyDescription">
                          <p id="report-p">{companyDescription}</p>
                        </div>
                        <div className="ofcards">
                          <OverviewFundingCards />
                        </div>
                        <div className="report-ownership-structure-container">
                          <div className="title-line-wrapper">
                            <p id="report-ownership-title">
                              Ownership Structure
                            </p>
                            <div className="title-line"></div>
                          </div>
                          <OwnershipBar shareholders={shareholders} />
                          <div className="color-scheme-grid">
                            {shareholderOptions.map((option) => (
                              <div
                                key={option.value}
                                className="color-scheme-item"
                              >
                                <div
                                  className={`color-box ${option.color}`}
                                ></div>
                                <span className="color-label">
                                  {option.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="spider-structure-container">
                          <div className="title-line-wrapper">
                            <p id="report-spider-title">
                              Investment Readiness Graph
                            </p>
                            <div className="title-line"></div>
                          </div>
                          <Report />
                          <section className="combined-container">
                            <div className="left-section">
                              <div className="investment-readiness-container">
                                <ParameterLevelComponent />
                              </div>
                            </div>
                            <div className="right-section">
                              <InvestmentReadiness />
                            </div>
                          </section>
                        </div>
                        <Button
                          className="report-button"
                          onClick={handleDownload}
                          style={{
                            width: "100%",
                            height: "60px",
                            color: "black",
                            fontWeight: 600,
                            backgroundColor: "#C7F83F",
                            border: "1px solid #000",
                            boxShadow: "2px #1D201F",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "white";
                            e.target.style.color = "black";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#C7F83F";
                            e.target.style.color = "black";
                          }}
                        >
                          Download Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="reach-out-col px-0" lg={3} md={3} xs={12}>
                <div className="reach-out-content">
                  <img
                    className="reach-out-image"
                    src="image/report.png"
                    alt="Form Image"
                  />
                </div>
              </Col>
            </Row>
            <div>
              <img className="gradient" src="image/gradient.png" />
              <footer
                className="login-footer"
                style={{
                  color: "white",
                  // backgroundColor: "#1D201F",
                  padding: "10px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                ©️ Copyright Ampersand 2024. Not to be circulated without prior
                permission
              </footer>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReportPage;

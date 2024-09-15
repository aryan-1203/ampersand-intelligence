import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  st_stage: Yup.string().required("Stage is required"),
  st_raised_to_date: Yup.string().required("Raised amount is required"),
  st_last_valuation: Yup.string().required("Last valuation is required"),
  st_current_valuation: Yup.string().required("Current valuation is required"),
  st_capital_requirements: Yup.string().required("Capital requirements are required"),
});

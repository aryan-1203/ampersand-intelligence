// validationSchema.js
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  st_company_name: Yup.string().required('Company Name is required'),
  st_company_description: Yup.string().required('Company Description is required'),
  st_year_of_incorporation: Yup.string().required('Year of Incorporation is required'),
  st_country: Yup.string().required('Country is required'),
  st_total_founders: Yup.string().required('Total Founders is required'),
  st_no_of_employees: Yup.string().required('Number of Employees is required'),
  st_industry_type: Yup.string().required('Industry Type is required'),
  st_geography: Yup.string().required('Geography is required'),
  founderNames: Yup.array().of(Yup.string().trim()).min(1, 'At least one founder is required'),
});


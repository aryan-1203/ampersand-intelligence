import axios from 'axios';

const baseURL = 'http://3.110.177.173:2001';

const api = axios.create({
  baseURL,
});

export default api;

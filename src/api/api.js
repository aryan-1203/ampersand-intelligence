import axios from 'axios';

const baseURL = 'http://ai.ampvc.co:2001';

const api = axios.create({
  baseURL,
});

export default api;
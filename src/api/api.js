import axios from 'axios';

const baseURL = 'https://www.ai.ampvc.co/api/v1';

const api = axios.create({
  baseURL,
});

export default api;

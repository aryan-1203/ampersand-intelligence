import axios from 'axios';

const baseURL = 'https://ai.ampvc.co/api/v1';

const api = axios.create({
  baseURL,
});

export default api;

import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://inventory-management-py4o.onrender.com/api';

const api = axios.create({ baseURL, withCredentials: false });

export default api;


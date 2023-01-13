import axios from 'axios'
import { api } from '../urlConfigs'
import store from "../store/index";

const token = window.localStorage.getItem('token')

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `${token}` : ''
    }
});

axiosInstance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if (auth.token) {
      req.headers.Authorization = ` ${auth.token}`;
    }
    return req;
  });
  

export default axiosInstance
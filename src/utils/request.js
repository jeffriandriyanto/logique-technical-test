import axios from "axios";

const service = axios.create({
  baseURL: "https://itunes.apple.com",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    alert(error)
  }
);

export default service;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Replace with your API's base URL
  timeout: 10000, // Optional: Set a request timeout
  headers: {
    "Content-Type": "application/json",
    // Any other default headers you want to set
  },
});

// Attach JWT token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login page)
      console.error("Unauthorized! Redirecting to login...");
      // You can add redirection or other logic here
    }
    return Promise.reject(error);
  }
);

export default instance;

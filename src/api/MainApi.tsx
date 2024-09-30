import axios from "axios";

export const api_json_body = axios.create({
  // baseURL: "https://8632-115-77-150-210.ngrok-free.app",
  baseURL: "http://103.75.182.16:8080",
  // baseURL: "https://springboot-neo4j-ecommerce-project.onrender.com",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_form_data_body = axios.create({
  // baseURL: "https://8632-115-77-150-210.ngrok-free.app",
  baseURL: "http://103.75.182.16:8080",
  // baseURL: "https://springboot-neo4j-ecommerce-project.onrender.com/",
  timeout: 100000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// http://103.75.182.16:8080/api/v1/products

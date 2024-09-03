import axios from "axios";

export const api_json_body = axios.create({
  // baseURL: "http://springapp.ap-southeast-2.elasticbeanstalk.com",
  baseURL:
    "https://63a1-2402-800-637c-bb64-e401-4a58-2266-fc83.ngrok-free.app/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_form_data_body = axios.create({
  // baseURL: "http://springapp.ap-southeast-2.elasticbeanstalk.com",
  baseURL:
    "https://63a1-2402-800-637c-bb64-e401-4a58-2266-fc83.ngrok-free.app/",
  timeout: 20000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

import axios from "axios";

export const api_json_body = axios.create({
  baseURL: "http://springapp.ap-southeast-2.elasticbeanstalk.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_form_data_body = axios.create({
  baseURL: "http://springapp.ap-southeast-2.elasticbeanstalk.com",
  timeout: 20000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

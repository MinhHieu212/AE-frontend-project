import axios from "axios";

export const api_json_body = axios.create({
  // baseURL: "http://springapp.ap-southeast-2.elasticbeanstalk.com",
  baseURL: "https://springboot-neo4j-ecommerce-project.onrender.com",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_form_data_body = axios.create({
  // baseURL: "http://springapp.ap-southeast-2.elasticbeanstalk.com",
  baseURL: "https://springboot-neo4j-ecommerce-project.onrender.com/",
  timeout: 100000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

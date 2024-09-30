// http://localhost:8080/api/auth/exists?email=hung@gmail.com

import { api_json_body } from "./MainApi";

export const checkEmailExist = async (params?: any) => {
  try {
    const response = await api_json_body.get("/api/auth/exists", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SignIn = async (body?: any) => {
  try {
    const response = await api_json_body.post("/api/auth/registration", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SignUp = async (body?: any) => {
  try {
    const response = await api_json_body.post("/api/auth/registration", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

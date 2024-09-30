import { api_json_body } from "./MainApi";

export const getBanner = async () => {
  try {
    const response = await api_json_body.get("/api/v1/banner");
    return response.data;
  } catch (error) {
    throw error;
  }
};

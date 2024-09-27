import { api_json_body } from "./MainApi";

export const getCollections = async () => {
  try {
    const response = await api_json_body.get("/api/v1/collections/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

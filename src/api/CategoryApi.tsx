import { toast } from "../utils/Toastify";
import { api_json_body } from "./MainApi";

export const getCategories = async () => {
  try {
    const response = await api_json_body.get("/api/v1/category");
    return response.data;
  } catch (error) {
    throw error;
  }
};

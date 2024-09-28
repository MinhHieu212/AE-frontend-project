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

export const getCategoryById = async (category_id: string) => {
  if (category_id === "") return;
  try {
    const response = await api_json_body.get(`/api/v1/category/${category_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// http://103.75.182.16:8080/api/v1/category

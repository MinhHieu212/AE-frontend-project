import { api_form_data_body } from "./MainApi";

export const createProduct = async (body) => {
  try {
    const response = await api_form_data_body.post("/api/v2/products", body);
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

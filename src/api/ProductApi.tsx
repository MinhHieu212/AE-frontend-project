import { api_form_data_body, api_json_body } from "./MainApi";

export const createProduct = async (body: any) => {
  try {
    const response = await api_json_body.post("/api/v2/products", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductList = async (params?: any) => {
  try {
    const response = await api_json_body.get("/api/v1/products", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImageProduct = async (prod_id: number, body: any) => {
  try {
    const response = await api_form_data_body.post(
      `/api/v2/products/${prod_id}/upload/image`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadVariantImages = async (body: any) => {
  try {
    const response = await api_form_data_body.post(
      `/api/v1/variant/upload/image`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

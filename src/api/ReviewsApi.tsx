import { api_json_body } from "./MainApi";

export const getProductReviews = async (product_id: string) => {
  try {
    const response = await api_json_body.get(
      `/api/v1/review/product/${product_id}?limit=50`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProductReviews = async (product_id: string, body: any) => {
  try {
    const response = await api_json_body.post(
      `/products/review/${product_id}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

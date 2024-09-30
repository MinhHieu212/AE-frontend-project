import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  name: string;
  level: number;
}

interface PackageSize {
  length: number | null;
  width: number | null;
  height: number | null;
}

export interface ProductDetailsState {
  name: string;
  description: string;
  brandName: string;
  sellingTypes: string;
  categories: Category[];
  packages_size: PackageSize;
  imageURLs: string[];
  haveVariants: boolean;
  variants: any;
  rating: number;
  noOfReviews: number;
  options: any;
}

const initialState: ProductDetailsState = {
  name: "",
  description: "",
  brandName: "",
  sellingTypes: "In-store selling only",
  imageURLs: [],
  packages_size: { length: null, width: null, height: null },
  categories: [],
  haveVariants: false,
  variants: [],
  rating: 0,
  noOfReviews: 0,
  options: {},
};

export const productDetailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    initialProductDetail: (state, action: PayloadAction<{ value: any }>) => {
      return action.payload.value;
    },

    updateProductDetailField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },

    updateProductDetailState: (
      state,
      action: PayloadAction<{ prod_details: any }>
    ) => {
      return {
        ...state,
        ...action.payload.prod_details,
      };
    },

    resetProductData: () => initialState,
  },
});

export const {
  initialProductDetail,
  updateProductDetailField,
  resetProductData,
  updateProductDetailState,
} = productDetailSlice.actions;

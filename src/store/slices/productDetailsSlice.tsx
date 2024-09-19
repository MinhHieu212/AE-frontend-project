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

interface ProductDetailsState {
  name: string;
  description: string;
  brandName: string;
  sellingTypes: string;
  categories: Category[];
  packages_size: PackageSize;
  imageURLs: string[];
  haveVariants: boolean;
  variants: any;
}

interface SelectedVariantState {
  price: number;
  sale_price?: number;
  quantity?: number;
  variant_option: any;
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
};

export const productDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    initialProductDetails: (state, action: PayloadAction<{ value: any }>) => {
      return action.payload.value;
    },

    updateProductDetailsField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },

    resetProductData: () => initialState,
  },
});

export const {
  initialProductDetails,
  updateProductDetailsField,
  resetProductData,
} = productDetailsSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ImageFile {
  file: File;
  url: string;
}
export interface ProductState {
  name: string;
  description: string;
  brand: string;
  collections: { name: string; id: string }[];
  haveVariants: boolean;
  isFeatured: boolean;
  sellingType: string;
  category: {
    level_1: { name: string | null; index: string | null };
    level_2: { name: string | null; index: string | null };
  };
  inventory: {
    quantity: number | null;
    sku: string;
  };
  packages_weight: number | null;
  packages_size: {
    length: number | null;
    width: number | null;
    height: number | null;
  };
  pricing: {
    price: number | null;
    sale_price: number | null;
    mrsp: number | null;
  };
  images: ImageFile[];
  primaryImage: ImageFile | null;
  specification: any;
}

const initialState: ProductState = {
  name: "",
  description: "",
  brand: "",
  collections: [],
  haveVariants: false,
  isFeatured: false,
  sellingType: "In-store selling only",
  category: {
    level_1: { name: null, index: null },
    level_2: { name: null, index: null },
  },
  inventory: {
    quantity: null,
    sku: "",
  },
  packages_weight: null,
  packages_size: {
    length: null,
    width: null,
    height: null,
  },
  pricing: {
    price: null,
    sale_price: null,
    mrsp: null,
  },
  images: [],
  primaryImage: null,
  specification: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProductField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },

    updateProductPricing: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      state.pricing = {
        ...state.pricing,
        [action.payload.field]: action.payload.value,
      };
    },

    resetProductData: () => initialState,
  },
});

export const { updateProductField, resetProductData, updateProductPricing } =
  productSlice.actions;

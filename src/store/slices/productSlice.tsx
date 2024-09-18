import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  level_1: { name: string | null; index: number | null };
  level_2: { name: string | null; index: number | null };
}

interface Inventory {
  quantity: number | null;
  sku: string;
}

interface ImageFile {
  file: File;
  url: string;
}

interface PackageSize {
  length: number | null;
  width: number | null;
  height: number | null;
}

interface ProductState {
  name: string;
  description: string;
  brand: string;
  isFeatured: boolean;
  sellingType: string;
  category: Category;
  inventory: Inventory;
  packages_weight: number | null;
  packages_size: PackageSize;
  images: ImageFile[];
  primaryImage: ImageFile | null;
  hasVariants: boolean;
}

const initialState: ProductState = {
  name: "",
  description: "",
  brand: "",
  isFeatured: false,
  sellingType: "In-store selling only",
  images: [],
  primaryImage: null,
  packages_weight: null,
  inventory: { quantity: null, sku: "" },
  packages_size: { length: null, width: null, height: null },
  category: {
    level_1: { name: null, index: null },
    level_2: { name: null, index: null },
  },
  hasVariants: false,
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

    resetProductData: () => initialState,
  },
});

export const { updateProductField, resetProductData } = productSlice.actions;

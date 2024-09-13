import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  level_1: { name: string | null; index: number | null };
  level_2: { name: string | null; index: number | null };
}

interface Inventory {
  quantity: number | null;
  sku: string;
}

interface PackageSize {
  length: number | null;
  width: number | null;
  height: number | null;
}

interface Pricing {
  msrp: number | null;
  salePrice: number | null;
  price: number | null;
}

interface ProductFormState {
  name: string;
  description: string;
  sellingType: string;
  category: Category;
  inventory: Inventory;
  packages_weight: number | null;
  packages_size: PackageSize;
  pricing: Pricing;
  images: string[];
  primaryImage: string | null;
  errors: Record<string, string>;
  loading: boolean;
}

const initialState: ProductFormState = {
  name: "ProductFormState",
  description: "",
  sellingType: "In-store selling only",
  category: {
    level_1: { name: null, index: null },
    level_2: { name: null, index: null },
  },
  inventory: { quantity: null, sku: "" },
  packages_weight: null,
  packages_size: { length: null, width: null, height: null },
  pricing: { msrp: null, salePrice: null, price: null },
  images: [],
  primaryImage: null,
  errors: {},
  loading: false,
};

export const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof ProductFormState; value: any }>
    ) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },
    setErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, setErrors, setLoading, resetForm } =
  productFormSlice.actions;

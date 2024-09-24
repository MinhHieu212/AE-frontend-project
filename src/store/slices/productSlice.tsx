import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ImageFile {
  file: File;
  url: string;
}
interface ProductState {
  name: string;
  description: string;
  brand: string;
  collections: string[];
  haveVariants: boolean;
  isFeatured: boolean;
  sellingType: string;
  category: {
    level_1: { name: string | null; index: number | null };
    level_2: { name: string | null; index: number | null };
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
  specification: {
    common: {
      display: string | null;
      processor: string | null;
      battery: string | null;
      operatingSystem: string | null;
      waterResistance: string | null;
    };
    camera: {
      front: string | null;
      rear: string | null;
    };
    dimension: {
      height: string | null;
      weight: string | null;
      width: string | null;
      depth: string | null;
    };
  };
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
  specification: {
    common: {
      display: null,
      processor: null,
      battery: null,
      operatingSystem: null,
      waterResistance: null,
    },
    camera: {
      front: null,
      rear: null,
    },
    dimension: {
      height: null,
      width: null,
      depth: null,
      weight: null,
    },
  },
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

    updateProductSpecification: (
      state,
      action: PayloadAction<{
        parentField: keyof ProductState["specification"];
        field: string;
        value: any;
      }>
    ) => {
      const { parentField, field, value } = action.payload;

      if (parentField === "common") {
        state.specification.common = {
          ...state.specification.common,
          [field]: value,
        };
      } else if (parentField === "camera") {
        state.specification.camera = {
          ...state.specification.camera,
          [field]: value,
        };
      } else if (parentField === "dimension") {
        state.specification.dimension = {
          ...state.specification.dimension,
          [field]: value,
        };
      }
    },

    resetProductData: () => initialState,
  },
});

export const {
  updateProductField,
  resetProductData,
  updateProductPricing,
  updateProductSpecification,
} = productSlice.actions;

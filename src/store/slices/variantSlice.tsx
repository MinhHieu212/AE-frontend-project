import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Variant {
  id: number;
  type: string;
  values: string[];
}

interface VariantList {
  phone_variant: Variant[];
}

const initialState: VariantList = {
  phone_variant: [
    {
      id: 0,
      type: "color",
      values: ["red", "blue"],
    },
    {
      id: 1,
      type: "ram",
      values: ["16", "32"],
    },
    {
      id: 2,
      type: "storage",
      values: ["128", "256"],
    },
  ],
};

export const variantSlice = createSlice({
  name: "phone_variant",
  initialState,
  reducers: {
    addVariant: (state) => {
      state.phone_variant = [
        ...state.phone_variant,
        {
          id: state.phone_variant.length,
          type: "",
          values: [],
        },
      ];
    },
    setVariantType: (
      state,
      action: PayloadAction<{ id: number; new_type: string }>
    ) => {
      state.phone_variant = state.phone_variant.map((item) =>
        item.id === action.payload.id
          ? { ...item, type: action.payload.new_type }
          : item
      );
    },
    removeVariant: (state, action: PayloadAction<{ id: number }>) => {
      state.phone_variant = state.phone_variant.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setVariantValue: (
      state,
      action: PayloadAction<{ id: number; new_value: string }>
    ) => {
      state.phone_variant = state.phone_variant.map((item) =>
        item.id === action.payload.id
          ? { ...item, values: [...item.values, action.payload.new_value] }
          : item
      );
    },
    removeVariantValue: (
      state,
      action: PayloadAction<{ id: number; remove_value: string }>
    ) => {
      state.phone_variant = state.phone_variant.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              values: item.values.filter(
                (item: any) => item !== action.payload.remove_value
              ),
            }
          : item
      );
    },
  },
});

export const {
  addVariant,
  removeVariant,
  setVariantType,
  setVariantValue,
  removeVariantValue,
} = variantSlice.actions;

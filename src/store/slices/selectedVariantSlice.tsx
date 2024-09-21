import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedVariantState {
  price: number | null;
  sale_price?: number | null;
  quantity?: number | null;
  variant_option: any;
}

const initialState: SelectedVariantState = {
  price: null,
  sale_price: null,
  quantity: null,
  variant_option: null,
};

export const selectedVariantSlice = createSlice({
  name: "selected_variant",
  initialState,
  reducers: {
    updateSelectedVariantsField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },

    resetSeletedVariant: () => initialState,

    initialSeletedVariant: (state, action: PayloadAction<{ value: any }>) =>
      action.payload.value,
  },
});

export const {
  updateSelectedVariantsField,
  initialSeletedVariant,
  resetSeletedVariant,
} = selectedVariantSlice.actions;

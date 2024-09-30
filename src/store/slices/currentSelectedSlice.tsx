import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentSelectedProps {
  selected_price: number;
  selected_sale_price: number;
  selected_quantity: number;
  selected_images: any[];
  selected_variants: Record<string, string>;
}

const initialState: CurrentSelectedProps = {
  selected_price: 0,
  selected_sale_price: 0,
  selected_quantity: 0,
  selected_images: [],
  selected_variants: {},
};

export const currentSelectedSlice = createSlice({
  name: "current_selected",
  initialState,
  reducers: {
    updateCurrentSelectedField: (
      state,
      action: PayloadAction<{ field: keyof CurrentSelectedProps; value: any }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetCurrentSelected: () => initialState,
    initialCurrentSelected: (
      state,
      action: PayloadAction<{ values: CurrentSelectedProps }>
    ) => {
      return action.payload.values;
    },
  },
});

export const {
  updateCurrentSelectedField,
  resetCurrentSelected,
  initialCurrentSelected,
} = currentSelectedSlice.actions;

export default currentSelectedSlice.reducer;

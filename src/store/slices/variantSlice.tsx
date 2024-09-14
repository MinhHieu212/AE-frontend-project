import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Variant {
  id: number;
  type: string;
  values: string[];
}

interface CombinationObject {
  [key: string]: string;
  price: string;
  salePrice: string;
  quantity: string;
}

interface VariantsState {
  phone_variant: Variant[];
  combinations: CombinationObject[];
  isTableGenerated: boolean;
}

const initialState: VariantsState = {
  phone_variant: [
    {
      id: 0,
      type: "",
      values: [],
    },
    {
      id: 1,
      type: "",
      values: [],
    },
  ],
  combinations: [],
  isTableGenerated: false,
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

    setIsTableGenerated: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isTableGenerated = action.payload.value;
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

    initializeCombinations: (state, action: PayloadAction<Variant[]>) => {
      state.phone_variant = action.payload;
      const variants: { [key: string]: string[] } = action.payload.reduce(
        (acc: { [key: string]: string[] }, variant: Variant) => {
          acc[variant.type] = variant.values;
          return acc;
        },
        {}
      );

      const generateCombinations = (arrays: string[][]): string[][] => {
        const result: string[][] = [];
        const combine = (index: number, current: string[]) => {
          if (index === arrays.length) {
            result.push(current);
            return;
          }
          for (let i = 0; i < arrays[index].length; i++) {
            combine(index + 1, [...current, arrays[index][i]]);
          }
        };
        combine(0, []);
        return result;
      };

      const allCombinations = generateCombinations(Object.values(variants));
      state.combinations = allCombinations.map((combination) => {
        const combinationObject: CombinationObject = {
          price: "",
          salePrice: "",
          quantity: "",
        };
        Object.keys(variants).forEach((key, index) => {
          combinationObject[key] = combination[index];
        });
        return combinationObject;
      });
    },

    updateCombination: (
      state,
      action: PayloadAction<{ index: number; field: string; value: string }>
    ) => {
      const { index, field, value } = action.payload;
      state.combinations[index][field] = value;
    },

    saveCombinations: (state) => {
      console.log("Saving combinations:", state.combinations);
    },
  },
});

export const {
  addVariant,
  removeVariant,
  setVariantType,
  setVariantValue,
  removeVariantValue,
  initializeCombinations,
  updateCombination,
  saveCombinations,
  setIsTableGenerated,
} = variantSlice.actions;

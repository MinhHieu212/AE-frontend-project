import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface VariantImage {
  file: File;
  url: string;
}

interface Variant {
  id: number;
  type: string;
  values: string[];
  images: VariantImage[];
}

interface CombinationObject {
  [key: string]: string;
  price: string;
  salePrice: string;
  quantity: string;
}

interface VariantsState {
  product_variant: Variant[];
  combinations: CombinationObject[];
}

const initialState: VariantsState = {
  product_variant: [
    {
      id: 0,
      type: "",
      values: [],
      images: [],
    },
    {
      id: 1,
      type: "",
      values: [],
      images: [],
    },
  ],
  combinations: [],
};

export const variantSlice = createSlice({
  name: "product_variant",
  initialState,
  reducers: {
    addVariant: (state) => {
      state.product_variant = [
        ...state.product_variant,
        {
          id: state.product_variant.length,
          type: "",
          values: [],
          images: [],
        },
      ];
    },

    setVariantType: (
      state,
      action: PayloadAction<{ id: number; new_type: string }>
    ) => {
      state.product_variant = state.product_variant.map((item) =>
        item.id === action.payload.id
          ? { ...item, type: action.payload.new_type }
          : item
      );
    },

    removeVariant: (state, action: PayloadAction<{ id: number }>) => {
      state.product_variant = state.product_variant
        .filter((item) => item.id !== action.payload.id)
        .map((item, index) => ({ ...item, id: index }));
    },

    updateVariantImages: (
      state,
      action: PayloadAction<{ id: number; images: VariantImage[] }>
    ) => {
      state.product_variant = state.product_variant.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              images: action.payload.images,
            }
          : item
      );
    },

    setVariantValue: (
      state,
      action: PayloadAction<{ id: number; new_value: string }>
    ) => {
      state.product_variant = state.product_variant.map((item) =>
        item.id === action.payload.id
          ? { ...item, values: [...item.values, action.payload.new_value] }
          : item
      );
    },

    removeVariantValue: (
      state,
      action: PayloadAction<{ id: number; remove_value: string }>
    ) => {
      state.product_variant = state.product_variant.map((item) =>
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
      state.product_variant = action.payload;
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
  updateVariantImages,
} = variantSlice.actions;

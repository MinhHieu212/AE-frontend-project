import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VariantObjProps {
  id: number;
  unit?: string;
  type: string;
  values: string[];
}
interface FileImageProps {
  file: File;
  url: string;
}
interface VariantWithImageProps {
  type: string;
  value: string;
  images: FileImageProps[];
}

interface VariantCombinationProps {
  [key: string]: string;
  price: string;
  salePrice: string;
  mrspPrice: string;
  quantity: string;
}
interface ProductVariantProps {
  variants: VariantObjProps[];
  combineVariantWithPricing: VariantCombinationProps[];
  variantWithImages: VariantWithImageProps[];
  primaryVariant: string;
}

const initialState: ProductVariantProps = {
  variants: [],
  combineVariantWithPricing: [],
  variantWithImages: [],
  primaryVariant: "",
};

export const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    addVariant: (state) => {
      state.variants = [
        ...state.variants,
        {
          id: state.variants.length,
          type: "",
          values: [],
        },
      ];
    },

    setVariantType: (
      state,
      action: PayloadAction<{ id: number; new_type: string }>
    ) => {
      state.variants = state.variants.map((item) =>
        item.id === action.payload.id
          ? { ...item, type: action.payload.new_type }
          : item
      );
    },

    initialVariants: (
      state,
      action: PayloadAction<{ variants: VariantObjProps[] }>
    ) => {
      state.variants = action.payload.variants;
    },

    setPrimaryVariants: (state, action: PayloadAction<{ variant: string }>) => {
      state.primaryVariant = action.payload.variant;
    },

    removeVariant: (state, action: PayloadAction<{ id: number }>) => {
      state.variants = state.variants
        .filter((item) => item.id !== action.payload.id)
        .map((item, index) => ({ ...item, id: index }));
    },

    updateVariantImages: (
      state,
      action: PayloadAction<{ id: number; images: FileImageProps[] }>
    ) => {
      state.variants = state.variants.map((item) =>
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
      state.variants = state.variants.map((item) =>
        item.id === action.payload.id
          ? { ...item, values: [...item.values, action.payload.new_value] }
          : item
      );
    },

    removeVariantValue: (
      state,
      action: PayloadAction<{ id: number; remove_value: string }>
    ) => {
      state.variants = state.variants.map((item) =>
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

    initializeCombinations: (
      state,
      action: PayloadAction<VariantObjProps[]>
    ) => {
      state.variants = action.payload;
      const variants: { [key: string]: string[] } = action.payload.reduce(
        (acc: { [key: string]: string[] }, variant: VariantObjProps) => {
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
      state.combineVariantWithPricing = allCombinations.map((combination) => {
        const combinationObject: VariantCombinationProps = {
          price: "",
          salePrice: "",
          quantity: "",
          mrspPrice: "",
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
      state.combineVariantWithPricing[index][field] = value;
    },

    saveCombinations: (state) => {
      console.log(
        "Saving combineVariantWithPricing:",
        state.combineVariantWithPricing
      );
    },
  },
});

export const {
  addVariant,
  removeVariant,
  setVariantType,
  setPrimaryVariants,
  setVariantValue,
  removeVariantValue,
  initializeCombinations,
  updateCombination,
  initialVariants,
  saveCombinations,
  updateVariantImages,
} = variantSlice.actions;

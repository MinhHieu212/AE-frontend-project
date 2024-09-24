import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VariantObjProps {
  id: number;
  type: string;
  values: string[];
  unit?: string;
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
  sku: string;
  price: string;
  salePrice: string;
  mrspPrice: string;
  quantity: string;
}

interface VariantProps {
  combineVariantsTable: VariantCombinationProps[];
  variantWithImages: VariantWithImageProps[];
  variants: VariantObjProps[];
  primaryVariant: string;
}

const initialState: VariantProps = {
  combineVariantsTable: [],
  variantWithImages: [],
  variants: [],
  primaryVariant: "",
};

export const variantsSlice = createSlice({
  name: "variants",
  initialState,
  reducers: {
    // add new variant
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

    // set variant type
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

    // add new_values into currently variant's values
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

    // remove value in variant_values
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

    // choose category -> suggest product variants -> set new variants with this method
    initialVariants: (
      state,
      action: PayloadAction<{ variants: VariantObjProps[] }>
    ) => {
      state.variants = action.payload.variants;
    },

    // set primary for product variants
    setPrimaryVariant: (state, action: PayloadAction<{ variant: string }>) => {
      state.primaryVariant = action.payload.variant;
    },

    // remove variant out variants list
    removeVariant: (state, action: PayloadAction<{ id: number }>) => {
      state.variants = state.variants
        .filter((item) => item.id !== action.payload.id)
        .map((item, index) => ({ ...item, id: index }));
    },

    // update list images for specify value of one variant
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

    // generate table variant with pricing, quantity, sku
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

      state.combineVariantsTable = allCombinations.map((combination) => {
        const combinationObject: VariantCombinationProps = {
          price: "",
          salePrice: "",
          quantity: "",
          mrspPrice: "",
          sku: "",
        };
        Object.keys(variants).forEach((key, index) => {
          combinationObject[key] = combination[index];
        });
        return combinationObject;
      });
    },

    updateCombinationFieldValue: (
      state,
      action: PayloadAction<{ index: number; field: string; value: string }>
    ) => {
      const { index, field, value } = action.payload;
      state.combineVariantsTable[index][field] = value;
    },
  },
});

export const {
  addVariant,
  removeVariant,
  setVariantType,
  setPrimaryVariant,
  setVariantValue,
  removeVariantValue,
  initializeCombinations,
  updateCombinationFieldValue,
  initialVariants,
  updateVariantImages,
} = variantsSlice.actions;

// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { roleSlice } from "./slices/roleSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productSlice } from "./slices/productSlice";
import { productDetailsSlice } from "./slices/productDetailsSlice";
import { productVariantSlice } from "./slices/productVariantSlice";
import { selectedVariantSlice } from "./slices/selectedVariantSlice";

export const store = configureStore({
  reducer: {
    roles: roleSlice.reducer,
    product: productSlice.reducer,
    variants: productVariantSlice.reducer,
    details: productDetailsSlice.reducer,
    selected_variants: selectedVariantSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

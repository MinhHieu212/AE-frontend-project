// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { roleSlice } from "./slices/roleSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { variantSlice } from "./slices/variantSlice";
import { productSlice } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    roles: roleSlice.reducer,
    variants: variantSlice.reducer,
    product: productSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

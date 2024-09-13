// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { roleSlice } from "./slices/roleSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productFormSlice } from "./slices/productFormSlice";

export const store = configureStore({
  reducer: {
    role: roleSlice.reducer,
    ProductFormState: productFormSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

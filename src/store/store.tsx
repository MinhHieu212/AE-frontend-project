// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productSlice } from "./slices/productSlice";
import { currentSelectedSlice } from "./slices/currentSelectedSlice";
import { variantsSlice } from "./slices/variantsSlice";
import { productDetailSlice } from "./slices/productDetailSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    variants: variantsSlice.reducer,
    detail: productDetailSlice.reducer,
    current_selected: currentSelectedSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

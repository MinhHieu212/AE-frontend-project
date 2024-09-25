import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RoleState {
  user_role: string;
}

const initialState: RoleState = {
  // user_role: "seller",
  user_role: "buyer",
  // user_role: "anonymous",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<{ user_role: string }>) => {
      state.user_role = action.payload.user_role;
    },
  },
});

export const { setRole } = roleSlice.actions;

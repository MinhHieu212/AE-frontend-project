import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  token: string;
}

const initialState: UserState = {
  id: "",
  fullName: "",
  email: "",
  phone: "",
  address: "",
  role: "seller",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return initialState;
    },
    updateUserField: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, clearUser, updateUserField } = userSlice.actions;

export default userSlice.reducer;

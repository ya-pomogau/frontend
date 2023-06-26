import {
  createSlice,
  PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { api } from "shared/api";
import type { TUserInfo, TUserRole } from "../types";

type TUserState = {
  role: TUserRole | undefined;
  data: TUserInfo | null;
  isLoading: boolean;
  isFailed: boolean;
}

const initialState: TUserState = {
  role: undefined,
  data: null,
  isLoading: false,
  isFailed: false,
  // name: "Иванов Иван Иванович",
  // role: "volunteer",
  // id: 112233,
  // phoneNumber: "+7(000)000-00-00",
  // address: "Ул. Потолочного д. 3",
  // avatarLink: "https://i.pravatar.cc/300",
  // score: 2500,
  // virtualKey: true,
  // completedTasksCount: 150,
  // tasksCount: 5,
  // description: "Я люблю музыку, книги и кошек",
};

export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async () => {
    const response = await api.getAllUsers();
    console.log(response);
    return response[7];
  }
);

export const viewerModel = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole: (state, { payload }: PayloadAction<TUserRole>) => {
      state.role = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
    })
  },
});

export const { setUserRole } = viewerModel.actions;

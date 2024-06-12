import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TContacts } from '../types';

const initialState: TContacts = {
  email: null,
  socialNetwork: null,
};

export const contactsModel = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, { payload }: PayloadAction<TContacts | null>) => {
      state.email = payload?.email;
      state.socialNetwork = payload?.socialNetwork;
    },
  },
});

export const { setContacts } = contactsModel.actions;

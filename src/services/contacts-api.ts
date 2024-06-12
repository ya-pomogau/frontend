import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api-config';
import { getTokenAccess } from '../shared/libs/utils';
import { TContacts } from '../shared/types/common.types';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getTokenAccess();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: (build) => ({
    getContacts: build.query<TContacts, void>({
      query: () => 'system/contacts',
    }),
  }),
});

export const { useGetContactsQuery } = contactsApi;

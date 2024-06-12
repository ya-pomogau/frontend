import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api-config';
import { getTokenAccess } from '../shared/libs/utils';
import { TContacts } from '../entities/contacts/types';

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
    // для изменения контактов на бэке есть метод сервиса, но нет ручки
    updateContacts: build.mutation<TContacts, TContacts>({
      query: (newContacts) => ({
        url: 'system/contacts',
        method: 'PATCH',
        body: newContacts,
      }),
    }),
  }),
});

export const { useGetContactsQuery, useUpdateContactsMutation } = contactsApi;

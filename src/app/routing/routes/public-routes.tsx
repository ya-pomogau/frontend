import { RouteObject } from 'react-router-dom';
import { Routes } from 'shared/config';

export const publicRoutes: RouteObject[] = [
  {
    path: Routes.BLOG,
    lazy: async () => ({
      Component: (await import('pages/blog')).BlogPage,
    }),
  },
  {
    path: Routes.POLICY,
    lazy: async () => ({
      Component: (await import('pages/policy')).PolicyPage,
    }),
  },
  {
    path: Routes.CONTACTS,
    lazy: async () => ({
      Component: (await import('pages/contacts')).ContactsPage,
    }),
  },
  {
    path: Routes.FEEDBACK,
    lazy: async () => ({
      Component: (await import('pages/feedback')).FeedbackPage,
    }),
  },
];

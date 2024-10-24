import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RoutesGroup } from 'app/routing/components/routes-group';

import { Routes } from '../../shared/config';
import {
  Layout,
  UnauthPage,
  RequestsPage,
  BlogPage,
  PolicyPage,
  ContactsPage,
  ProfilePage,
  PickRolePage,
  NotFoundPage,
  ProfileMapPage,
  ProfileActivePage,
  ProfileCompletedPage,
  StatisticsPage,
  ApplicationsStatisticsPage,
  SectionChatsConflict,
  SectionSystemChats,
  CreateNewAdminPage,
  UsersStatisticsPage,
  TasksPage,
  TasksProfilePage,
  LoginPage,
  Logout,
  BidsPage,
  VKAuthPage,
  RegisterPage,
} from 'pages';
import { tabs } from '../../shared/types/common.types';
import { ProfileChatsPages } from 'widgets/profile-chats';

export const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    element: <Layout />,
    children: [
      {
        element: <RoutesGroup publicRoutes />,
        children: [
          { path: Routes.PROFILE, element: <ProfilePage /> },
          { index: true, element: <UnauthPage /> },
          { path: Routes.BLOG, element: <BlogPage /> },
          { path: Routes.POLICY, element: <PolicyPage /> },
          { path: Routes.CONTACTS, element: <ContactsPage /> },
          // Удалить когда система аутификации будет готова
          { path: Routes.PICK, element: <PickRolePage /> },
        ],
      },
      {
        element: <RoutesGroup onlyUnauthorized />,
        children: [
          { path: Routes.REGISTER, element: <RegisterPage /> },
          { path: Routes.LOGIN, element: <LoginPage /> },
          { path: Routes.VK_AUTH, element: <VKAuthPage /> },
        ],
      },
      {
        element: (
          <RoutesGroup
            allowed={{ Volunteer: true, Recipient: true, Admin: true }}
          />
        ),
        children: [
          { path: Routes.PROFILE, element: <ProfilePage /> },
          { path: Routes.OUT, element: <Logout /> },
        ],
      },
      {
        element: <RoutesGroup allowed={{ Volunteer: true }} />,
        children: [{ path: Routes.PROFILE_MAP, element: <ProfileMapPage /> }],
      },
      {
        element: <RoutesGroup allowed={{ Volunteer: true, Recipient: true }} />,
        children: [
          { path: Routes.PROFILE_ACTIVE, element: <ProfileActivePage /> },
          { path: Routes.PROFILE_COMPLETED, element: <ProfileCompletedPage /> },
        ],
      },
      {
        element: <RoutesGroup allowed={{ Admin: true }} />,
        children: [
          {
            path: Routes.PROFILE_REQUESTS,
            element: <Navigate to={Routes.PROFILE_REQUESTS_VOLUNTEERS} />,
          },
          {
            path: Routes.PROFILE_REQUESTS_VOLUNTEERS,
            element: <RequestsPage incomeTab={tabs.VOLUNTEERS} />,
          },
          {
            path: Routes.PROFILE_REQUESTS_RECIPIENTS,
            element: <RequestsPage incomeTab={tabs.RECIPIENTS} />,
          },
          {
            path: Routes.PROFILE_REQUESTS_NOTPROCESSED,
            element: <RequestsPage incomeTab={tabs.NOTPROCESSED} />,
          },
          {
            path: Routes.PROFILE_STATISTICS,
            element: <StatisticsPage />,
          },
          {
            path: Routes.PROFILE_STATISTICS_APPLICATIONS,
            element: <ApplicationsStatisticsPage />,
          },
          {
            path: Routes.PROFILE_STATISTICS_USERS,
            element: <UsersStatisticsPage />,
          },
          {
            path: Routes.PROFILE_TASKS,
            element: <Navigate to={Routes.PROFILE_TASKS_RECIPIENTS} />,
          },
          {
            path: Routes.PROFILE_TASKS_RECIPIENTS,
            element: <TasksPage incomeTab={tabs.RECIPIENTS} />,
          },
          {
            path: Routes.PROFILE_TASKS_VOLUNTEERS,
            element: <TasksPage incomeTab={tabs.VOLUNTEERS} />,
          },
          {
            path: Routes.PROFILE_TASKS_RECIPIENTS_USERID,
            element: <TasksProfilePage incomeTab={tabs.RECIPIENTS} />,
          },
          {
            path: Routes.PROFILE_TASKS_VOLUNTEERS_USERID,
            element: <TasksProfilePage incomeTab={tabs.VOLUNTEERS} />,
          },
          {
            path: Routes.PROFILE_BIDS,
            element: <BidsPage />,
          },
          {
            path: Routes.CHAT_HUB,
            element: <Navigate to={Routes.CHAT_HUB_UNREVIEWED} />,
          },
          {
            path: Routes.CHAT_CONFLICT,
            element: <Navigate to={Routes.CHAT_CONFLICT_UNREVIEWED} />,
          },
          {
            path: Routes.CHAT_HUB_UNREVIEWED,
            element: (
              <ProfileChatsPages>
                <SectionSystemChats />
              </ProfileChatsPages>
            ),
          },
          {
            path: Routes.CHAT_HUB_IN_WORK,
            element: (
              <ProfileChatsPages>
                <SectionSystemChats />
              </ProfileChatsPages>
            ),
          },
          {
            path: Routes.CHAT_HUB_COMPLETED,
            element: (
              <ProfileChatsPages>
                <SectionSystemChats />
              </ProfileChatsPages>
            ),
          },
          {
            path: Routes.CHAT_CONFLICT_UNREVIEWED,
            element: (
              <ProfileChatsPages>
                <SectionChatsConflict />
              </ProfileChatsPages>
            ),
          },
          {
            path: Routes.CHAT_CONFLICT_IN_WORK,
            element: (
              <ProfileChatsPages>
                <SectionChatsConflict />
              </ProfileChatsPages>
            ),
          },
          {
            path: Routes.CHAT_CONFLICT_COMPLETED,
            element: (
              <ProfileChatsPages>
                <SectionChatsConflict />
              </ProfileChatsPages>
            ),
          },
        ],
      },
      {
        element: <RoutesGroup allowed={{ Admin: true }} isRoot={true} />,
        children: [
          {
            path: Routes.PROFILE_REQUESTS_ADMINS,
            element: <RequestsPage incomeTab={tabs.ADMINS} />,
          },
          {
            path: Routes.PROFILE_CREATE_NEW_ADMIN,
            element: <CreateNewAdminPage />,
          },
        ],
      },
    ],
  },
  { path: Routes.NOT_FOUND, element: <NotFoundPage /> },
]);

import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RoutesGroup } from 'app/routing/components/routes-group';

import { Layout } from 'pages/layout';

import { Routes } from '../../shared/config';
import { UnauthPage } from 'pages/unauth';
import { RequestsPage } from 'pages/requests';
import { BlogPage } from 'pages/blog';
import { PolicyPage } from 'pages/policy';
import { ContactsPage } from 'pages/contacts';
import { FeedbackPage } from 'pages/feedback';
import { ProfilePage } from 'pages/profile';
import { PickRolePage } from 'pages/pick-role-page-temporary';
import { NotFoundPage } from 'pages/not-found';
import { ProfileMapPage } from 'pages/profile-map';
import { ProfileActivePage } from 'pages/profile-active';
import { ProfileCompletedPage } from 'pages/profile-completed';
import { StatisticsPage } from 'pages/statistics';
import { ApplicationsStatisticsPage } from 'pages/application-statistics';
import { UsersStatisticsPage } from 'pages/users-statistics';
import { TasksPage } from 'pages/tasks';
import { TasksProfilePage } from 'pages/tasks-profile';
import { SettingsPage } from 'pages/settings';
import { LoginPage } from 'pages/login';
import { Logout } from 'pages/logout';
import { BidsPage } from 'pages/bids';
import { VKAuthPage } from 'pages/vk-auth';
import { RegisterPage } from 'pages/register';
import { Tabs } from '../../shared/types/common.types';
import { ProfileChatsPages } from 'widgets/profile-chats';
import { SectionChatsConflict } from 'pages/section-chats-conflict';
import { SectionInWorkChats } from 'pages/section-in-work-chats';
import { SectionChatHub } from 'pages/section-chat-hub';
import { CreateNewAdminPage } from 'pages/profile-new-admin';

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
          { path: Routes.FEEDBACK, element: <FeedbackPage /> },
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
          { path: Routes.SETTINGS, element: <SettingsPage /> },
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
            element: <RequestsPage incomeTab={Tabs.VOLUNTEERS} />,
          },
          {
            path: Routes.PROFILE_REQUESTS_RECIPIENTS,
            element: <RequestsPage incomeTab={Tabs.RECIPIENTS} />,
          },
          {
            path: Routes.PROFILE_REQUESTS_NOTPROCESSED,
            element: <RequestsPage incomeTab={Tabs.NOTPROCESSED} />,
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
            element: <TasksPage incomeTab={Tabs.RECIPIENTS} />,
          },
          {
            path: Routes.PROFILE_TASKS_VOLUNTEERS,
            element: <TasksPage incomeTab={Tabs.VOLUNTEERS} />,
          },
          {
            path: Routes.PROFILE_TASKS_RECIPIENTS_USERID,
            element: <TasksProfilePage incomeTab={Tabs.RECIPIENTS} />,
          },
          {
            path: Routes.PROFILE_TASKS_VOLUNTEERS_USERID,
            element: <TasksProfilePage incomeTab={Tabs.VOLUNTEERS} />,
          },
          {
            path: Routes.PROFILE_BIDS,
            element: <BidsPage />,
          },
          {
            path: Routes.CHAT_HUB,
            element: (
              <ProfileChatsPages>
                <SectionChatHub />
              </ProfileChatsPages>
            ),
          },
          {
            path: Routes.CHAT_IN_WORK,
            element: (
              <ProfileChatsPages>
                <SectionInWorkChats />
              </ProfileChatsPages>
            ),
          },
          {
            path: Routes.CHAT_CONFLICT,
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
            element: <RequestsPage incomeTab={Tabs.ADMINS} />,
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

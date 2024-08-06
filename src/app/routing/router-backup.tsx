import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={Routes.ROOT} element={<Layout />}>
        <Route element={<RoutesGroup publicRoutes />}>
          <Route path={Routes.PROFILE} element={<ProfilePage />} />
          <Route index element={<UnauthPage />} />

          <Route path={Routes.BLOG} element={<BlogPage />} />

          <Route path={Routes.POLICY} element={<PolicyPage />} />

          <Route path={Routes.CONTACTS} element={<ContactsPage />} />
          <Route path={Routes.FEEDBACK} element={<FeedbackPage />} />

          {/* Удалить когда система аутификации будет готова */}
          <Route path={Routes.PICK} element={<PickRolePage />} />
        </Route>

        <Route element={<RoutesGroup onlyUnauthorized />}>
          <Route path={Routes.REGISTER} element={<RegisterPage />} />
          <Route path={Routes.LOGIN} element={<LoginPage />} />
          <Route path={Routes.VK_AUTH} element={<VKAuthPage />} />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                Volunteer: true,
                Recipient: true,
                Admin: true,
              }}
            />
          }
        >
          <Route path={Routes.PROFILE} element={<ProfilePage />} />
          <Route path={Routes.SETTINGS} element={<SettingsPage />} />
          <Route path={Routes.OUT} element={<Logout />} />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                Volunteer: true,
              }}
            />
          }
        >
          <Route path={Routes.PROFILE_MAP} element={<ProfileMapPage />} />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                Volunteer: true,
                Recipient: true,
              }}
            />
          }
        >
          <Route path={Routes.PROFILE_ACTIVE} element={<ProfileActivePage />} />

          <Route
            path={Routes.PROFILE_COMPLETED}
            element={<ProfileCompletedPage />}
          />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                Admin: true,
              }}
            />
          }
        >
          <Route
            path={Routes.PROFILE_REQUESTS}
            element={<Navigate to={Routes.PROFILE_REQUESTS_VOLUNTEERS} />}
          />
          <Route
            path={Routes.PROFILE_REQUESTS_VOLUNTEERS}
            element={<RequestsPage incomeTab={Tabs.VOLUNTEERS} />}
          />
          <Route
            path={Routes.PROFILE_REQUESTS_RECIPIENTS}
            element={<RequestsPage incomeTab={Tabs.RECIPIENTS} />}
          />
          <Route
            path={Routes.PROFILE_REQUESTS_NOTPROCESSED}
            element={<RequestsPage incomeTab={Tabs.NOTPROCESSED} />}
          />
          <Route
            path={Routes.PROFILE_STATISTICS}
            element={<StatisticsPage />}
          />
          <Route
            path={Routes.PROFILE_STATISTICS_APPLICATIONS}
            element={<ApplicationsStatisticsPage />}
          />
          <Route
            path={Routes.PROFILE_STATISTICS_USERS}
            element={<UsersStatisticsPage />}
          />
          <Route
            path={Routes.PROFILE_TASKS}
            element={<Navigate to={Routes.PROFILE_TASKS_RECIPIENTS} />}
          />
          <Route
            path={Routes.PROFILE_TASKS_RECIPIENTS}
            element={<TasksPage incomeTab={Tabs.RECIPIENTS} />}
          />
          <Route
            path={Routes.PROFILE_TASKS_VOLUNTEERS}
            element={<TasksPage incomeTab={Tabs.VOLUNTEERS} />}
          />
          <Route
            path={Routes.PROFILE_TASKS_RECIPIENTS_USERID}
            element={<TasksProfilePage incomeTab={Tabs.RECIPIENTS} />}
          />
          <Route
            path={Routes.PROFILE_TASKS_VOLUNTEERS_USERID}
            element={<TasksProfilePage incomeTab={Tabs.VOLUNTEERS} />}
          />
          <Route path={Routes.PROFILE_BIDS} element={<BidsPage />} />

          <Route
            path={Routes.CHAT_HUB}
            element={
              <ProfileChatsPages>
                <SectionChatHub />
              </ProfileChatsPages>
            }
          />
          <Route
            path={Routes.CHAT_IN_WORK}
            element={
              <ProfileChatsPages>
                <SectionInWorkChats />
              </ProfileChatsPages>
            }
          />
          <Route
            path={Routes.CHAT_CONFLICT}
            element={
              <ProfileChatsPages>
                <SectionChatsConflict />
              </ProfileChatsPages>
            }
          />
        </Route>
        <Route
          element={
            <RoutesGroup
              allowed={{
                Admin: true,
              }}
              isRoot={true}
            />
          }
        >
          <Route
            path={Routes.PROFILE_REQUESTS_ADMINS}
            element={<RequestsPage incomeTab={Tabs.ADMINS} />}
          />
          <Route
            path={Routes.PROFILE_CREATE_NEW_ADMIN}
            element={<CreateNewAdminPage />}
          />
        </Route>
      </Route>

      <Route path={Routes.NOT_FOUND} element={<NotFoundPage />} />
    </>
  )
);

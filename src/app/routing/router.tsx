import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { RoutesGroup } from 'app/routing/components/routes-group';

import { Layout } from 'pages/layout';

import { UnauthPage } from 'pages/unauth';
import { RequestsPage } from 'pages/requests';
import { RequestsVolunteersPage } from 'pages/requests-volunteers';
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
import { RequestsRecipientsPage } from 'pages/requests-recipients';
import { RequestsNotprocessedPage } from 'pages/requests-notprocessed';
import { StatisticsPage } from 'pages/statistics';
import { ApplicationsStatisticsPage } from 'pages/application-statistics';
import { UsersStatisticsPage } from 'pages/users-statistics';
import { TasksPage } from 'pages/tasks';
import { RequestsAdminsPage } from 'pages/requests-admins';
import { SettingsPage } from 'pages/settings';
import { LoginPage } from 'pages/login';
import { Logout } from 'pages/logout';
import { BidsPage } from 'pages/bids';
import { VKAuthPage } from 'pages/vk-auth';
import { RegisterPage } from 'pages/register';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route element={<RoutesGroup publicRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route index element={<UnauthPage />} />

          <Route path="/blog" element={<BlogPage />} />

          <Route path="/policy" element={<PolicyPage />} />

          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

          {/* Удалить когда система аутификации будет готова */}
          <Route path="/pick" element={<PickRolePage />} />
        </Route>

        <Route element={<RoutesGroup onlyUnauthorized />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/vk-auth" element={<VKAuthPage />} />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                volunteer: true,
                recipient: true,
                admin: true,
                master: true,
              }}
            />
          }
        >
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/out" element={<Logout />} />
          <Route path="/chat" element={<></>} />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                volunteer: true,
              }}
            />
          }
        >
          <Route path="/profile/map" element={<ProfileMapPage />} />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                volunteer: true,
                recipient: true,
              }}
            />
          }
        >
          <Route path="/profile/active" element={<ProfileActivePage />} />

          <Route path="/profile/completed" element={<ProfileCompletedPage />} />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                admin: true,
                master: true,
              }}
            />
          }
        >
          <Route path="/profile/requests" element={<RequestsPage />} />
          <Route
            path="/profile/requests/volunteers"
            element={<RequestsVolunteersPage />}
          />

          <Route
            path="/profile/requests/recipients"
            element={<RequestsRecipientsPage />}
          />

          <Route
            path="/profile/requests/notprocessed"
            element={<RequestsNotprocessedPage />}
          />

          <Route path="/profile/statistics" element={<StatisticsPage />} />

          <Route
            path="/profile/statistics/applications"
            element={<ApplicationsStatisticsPage />}
          />

          <Route
            path="/profile/statistics/users"
            element={<UsersStatisticsPage />}
          />

          <Route path="/profile/tasks" element={<TasksPage />} />

          <Route path="/profile/bids" element={<BidsPage />} />
        </Route>

        <Route
          element={
            <RoutesGroup
              allowed={{
                master: true,
              }}
            />
          }
        >
          <Route
            path="/profile/requests/admins"
            element={<RequestsAdminsPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

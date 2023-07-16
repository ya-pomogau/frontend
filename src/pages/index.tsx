import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { fetchUserDataByRole } from 'entities/user/model';

import { Layout } from './layout';
import { UnauthPage } from './unauth';
import { VolunteerPage } from './volunteer';
import { RecipientPage } from './recipient';
import { AdminPage } from './admin';
import { MasterAdminPage } from './master-admin';
import { BlogPage } from './blog';
import { PolicyPage } from './policy';
import { ContactsPage } from './contacts';
import { ProfilePage } from './profile';
import { NotFoundPage } from './not-found';
import { RegisterPage } from './register';

export function AppRoutes() {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);

  useEffect(() => {
    if (userRole) {
      dispatch(fetchUserDataByRole(userRole));
    }
  }, [userRole, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UnauthPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/volunteer/*" element={<VolunteerPage />} />
        <Route path="profile/recipient/*" element={<RecipientPage />} />
        <Route path="profile/admin/*" element={<AdminPage />} />
        <Route path="profile/master/*" element={<MasterAdminPage />} />
        <Route path="blog/*" element={<BlogPage />} />
        <Route path="policy" element={<PolicyPage />} />
        <Route path="contacts/*" element={<ContactsPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { ProfileReducer } from "entities/viewer/hoc";
import { Layout } from "./layout";
import { UnauthPage } from "./demo";
import { VolunteerPage } from "./volunteer";
import { ConsumerPage } from "./consumer";
import { AdminPage } from "./admin";
import { MasterAdminPage } from "./master-admin";
import { BlogPage } from "./blog";
import { PolicyPage } from "./policy";
import { ContactsPage } from "./contacts";
import { NotFoundPage } from "./not-found";
import { RegisterPage } from "./register";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<ProfileReducer />} />
        <Route path="profile/demo/*" element={<UnauthPage />} />
        <Route path="profile/volunteer/*" element={<VolunteerPage />} />
        <Route path="profile/consumer/*" element={<ConsumerPage />} />
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

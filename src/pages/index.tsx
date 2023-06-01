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

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<ProfileReducer />} />
        <Route path="demo/*" element={<UnauthPage />} />
        <Route path="volunteer/*" element={<VolunteerPage />} />
        <Route path="consumer/*" element={<ConsumerPage />} />
        <Route path="admin/*" element={<AdminPage />} />
        <Route path="master/*" element={<MasterAdminPage />} />
        <Route path="blog/*" element={<BlogPage />} />
        <Route path="policy" element={<PolicyPage />} />
        <Route path="contacts/*" element={<ContactsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom";
import { IntroReact } from "./intro-react";

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<IntroReact />} />
      <Route
        path="*"
        element={<h1>Страница не найдена или её никогда не было</h1>}
      />
    </Routes>
  );
}

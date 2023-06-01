import "./assets/styles/index.css";
import { withProviders } from "./providers";
import { AppRoutes } from "../pages";

function App() {
  return <AppRoutes />;
}
export default withProviders(App);

import "./assets/styles/index.css";

import Checkbox from "shared/ui/checkbox";
import { AppRoutes } from "../pages";
import { withProviders } from "./providers";

// function App() {
//   return <AppRoutes />;
// }

function App() {
  return (
    <Checkbox
      label="test"
      id="1221"
      onClickCheckbox={() => console.log("test")}
      checked={false}
    />
  );
}
export default withProviders(App);

import "./assets/styles/index.css";
import { DefaultCheckboxIcon } from "shared/ui/checkbox/checkbox-icon";
import { AppRoutes } from "../pages";
import { withProviders } from "./providers";
import Checkbox from "../shared/ui/checkbox";
// function App() {
//   return <AppRoutes />;
// }

function App() {
  return (
    <Checkbox
      id="22"
      name="22"
      checked
      onClickCheckbox={() => console.log("test")}
      label="blabla"
      icon={<DefaultCheckboxIcon />}
    />
  );
}
export default withProviders(App);

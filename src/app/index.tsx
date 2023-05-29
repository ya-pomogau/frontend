import "./assets/styles/index.css";
import { withProviders } from "./providers";
import Fieldset from "../shared/ui/fieldset";
import Checkbox from "../shared/ui/checkbox";
import { FieldsetView } from "../shared/ui/fieldset/utils";
import RadioButton from "../shared/ui/radio-button";

// function App() {
//   return <AppRoutes />;
// }
function App() {
  return (
    <>
      <Fieldset title="Тут длинный текст" view={FieldsetView.COLUMN}>
        <Checkbox label="Test1" id="11" name="1" />
        <Checkbox label="Test2" id="12" name="1" />
        <Checkbox label="Test3" id="13" name="1" />
      </Fieldset>
      <Fieldset title="Тут длинный текст" view={FieldsetView.TWO_COLUMN}>
        <Checkbox label="Test1" id="21" name="2" />
        <Checkbox label="Test2" id="22" name="2" />
        <Checkbox label="Test3" id="23" name="2" />
      </Fieldset>
      <Fieldset title="Тут длинный текст" view={FieldsetView.ROW}>
        <RadioButton label="Test1" id="31" name="3" />
        <RadioButton label="Test2" id="32" name="3" />
        <RadioButton label="Test3" id="33" name="3" />
      </Fieldset>
    </>
  );
}
export default withProviders(App);

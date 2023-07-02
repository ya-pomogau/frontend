import { ChangeEvent } from 'react';
import Fieldset from "shared/ui/fieldset";
import { FieldsetView } from "shared/ui/fieldset/utils";
import Checkbox from "shared/ui/checkbox";

interface Props {
  filter: string;
  onChange: (name: string, value: string[] | string) => void;
}

export const SortByBlock = ({ filter, onChange }: Props) => {
  const handleCheckboxChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    onChange("sortBy", target.id);
  };

  return (
  <Fieldset
    title="Отображать"
    view={FieldsetView.COLUMN}
  >
    <Checkbox
      checked={filter === "byDate"}
      id="byDate"
      label="По дате"
      onChange={handleCheckboxChange}
    />
    <Checkbox
      checked={filter === "decreasingPrice"}
      id="decreasingPrice"
      label="По убывающей цене"
      onChange={handleCheckboxChange}
    />
    <Checkbox
      checked={filter === "increasingPrice"}
      id="increasingPrice"
      label="По возрастающей цене"
      onChange={handleCheckboxChange}
    />
  </Fieldset>)
};
  
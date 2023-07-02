import { SortByBlock } from "../../sortBy-block";

interface Props {
  filter: string;
  onChange: (name: string, value: string[] | string) => void;
}

export const CompletedMode = ({ filter, onChange }: Props) => (
  <SortByBlock filter={filter} onChange={onChange}/>
);

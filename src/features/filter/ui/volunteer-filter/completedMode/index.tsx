import { SortByBlock } from '../../sortBy-block';

interface CompletedModeProps {
  filter: string;
  onChange: (name: string, value: string[] | string) => void;
}

export const CompletedMode = ({ filter, onChange }: CompletedModeProps) => (
  <SortByBlock filter={filter} onChange={onChange} userRole="volunteer" />
);

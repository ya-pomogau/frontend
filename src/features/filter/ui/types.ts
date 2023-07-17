export interface IFilterValues {
  categories: string[];
  date: string;
  searchRadius: string;
  sortBy: string;
}

export type TRecipientFilter = Omit<IFilterValues, 'date' | 'searchRadius'>;
export type TVolunteerFilter = IFilterValues;

export type TRole = 'admin' | 'recipient' | 'volunteer';

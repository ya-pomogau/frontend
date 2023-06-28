export interface IFilterValues {
  showByDate: boolean;
  categories: string[];
  date: string;
  searchRadius: string;
}

export type TRecipientFilter = Omit<IFilterValues, "date">;
export type TVolunteerFilter = Omit<IFilterValues, "showByDate">;
export type TRole = "admin" | "recipient" | "volunteer";

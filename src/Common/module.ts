export interface IContact {
  created_at?: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: { number: string }[];
}

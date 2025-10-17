import { IPagination } from './ipagination';

export interface IListResponse<T> {
  status: string;
  results: number;
  pagination: IPagination;
  data: T[];
}

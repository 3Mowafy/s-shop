export interface IPagination {
  page: number;
  limit: number;
  countOfPages: number;
  next?: number;
  prev?: number;
}

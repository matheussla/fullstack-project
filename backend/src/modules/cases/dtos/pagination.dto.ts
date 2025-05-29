export interface IPaginationParams {
  page: number;
  limit: number;
}

export interface IPaginationResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

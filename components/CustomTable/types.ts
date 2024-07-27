import { Column, TableState } from "@tanstack/react-table";

export interface PaginationSearch {
    pageNumber?: number;
    pageSize?: number;
    pageSearch?: string;
    questionMark?: boolean;
  }

export type CustomTableProps<D extends object> = {
  data: D[];
  columns: Column<D>[];
  searchField?: string;
  searchValue?: string;
  //metaData?: MetaData;
  // paginationInfo?: PaginationSearch;
  setPaginationInfo?: React.Dispatch<React.SetStateAction<PaginationSearch>>;
  footer?: React.ReactNode;
};

export type ExtendedState<D extends object> = {
    page: Array<any>;
    nextPage: () => void;
    previousPage: () => void;
    canNextPage: boolean;
    canPreviousPage: boolean;
    pageOptions: number[];
    //state: TableState<D>
    setPageSize: (size: number) => void;
  };

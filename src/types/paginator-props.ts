export type PaginatorProps = {
  setActualPage: React.Dispatch<React.SetStateAction<number>>;
  actualPage: number;
  totalPages: number;
}
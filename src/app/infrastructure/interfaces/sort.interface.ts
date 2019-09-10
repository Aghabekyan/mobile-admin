interface ISort {
  field?: string;
  order?: number;
  set?: (field: string, order: number) => void;
}

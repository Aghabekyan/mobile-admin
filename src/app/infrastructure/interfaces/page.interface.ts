interface IPage {
  number?: number;
  size?: number;
  set?: (first: number, rows: number) => void;
}

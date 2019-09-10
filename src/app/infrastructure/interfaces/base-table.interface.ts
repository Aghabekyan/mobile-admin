import {IFilter} from './filter.interface';

export interface IBaseTable {
  page?: IPage;
  filters?: IFilter;
  sort?: ISort;
}

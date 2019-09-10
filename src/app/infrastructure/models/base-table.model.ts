import {IFilter} from '../interfaces/filter.interface';
import {IBaseTable} from '../interfaces/base-table.interface';
import {PageModel} from './page.model';
import {SortModel} from './sort.model';

export class BaseTableModel implements IBaseTable {
  public page: IPage;
  public filters: IFilter;
  public sort: ISort;

  constructor(src?: IBaseTable) {
    this.page = new PageModel(src && src.page);
    this.filters = src && src.filters || {};
    this.sort = new SortModel(src && src.sort);
  }

  set(filters: IFilter) {
    this.filters = filters;
  }
}

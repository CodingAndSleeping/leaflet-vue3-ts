// 定义el-table-column上的属性接口
export interface IColumnProps {
  type?: string;
  index?: number | ((i: number) => number);
  label?: string;
  columnKey?: string;
  prop?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: string | boolean;
  renderHeader?: (colObj: any) => any;
  sortable?: boolean | string;
  sortMethod?: (a: any, b: any) => number;
  sortBy?: string | [] | ((row: any, index: number) => string);
  sortOrders?: ("ascending" | "descending" | null)[];
  resizable?: boolean;
  formatter?: () => any;
  showOverflowTooltip?: boolean;
  align?: string;
  headerAlign?: string;
  className?: string;
  labelClassName?: string;
  selectable?: (row: any, index: number) => boolean;
  reserveSelection?: boolean;
  filters?: any;
  filterPlacement?: string;
  filterMultiple?: boolean;
  filterMethod?: () => any;
  filteredValue?: [];
}
<template>
  <el-table
    ref="elTableRef"
    :data="data"
    :height="height"
    :max-height="maxHeight"
    :stripe="stripe"
    :border="border"
    :size="size"
    :fit="fit"
    :show-header="showHeader"
    :highlight-current-row="highlightCurrentRow"
    :current-row-key="currentRowKey"
    :row-class-name="rowClassName"
    :row-style="rowStyle"
    :cell-class-name="cellClassName"
    :cell-style="cellStyle"
    :header-row-class-name="headerRowClassName"
    :header-row-style="headerRowStyle"
    :header-cell-style="headerCellStyle"
    :row-key="rowKey"
    :empty-text="emptyText"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :default-sort="defaultSort"
    :tooltip-effect="tooltipEffect"
    :show-summary="showSummary"
    :sum-text="sumText"
    :summary-method="summaryMethod"
    :span-method="spanMethod"
    :select-on-indeterminate="selectOnIndeterminate"
    :indent="indent"
    :lazy="lazy"
    :load="load"
    :tree-props="treeProps"
    :table-layout="tableLayout"
    :scrollbar-always-on="scrollbarAlwaysOn"
    :flexible="flexible"
    @select="handleSelect"
    @select-all="handleSelectAll"
    @selection-change="handleSelectionChange"
    @cell-mouse-enter="handleCellMouseEnter"
    @cell-mouse-leave="handleCellMouseLeave"
    @cell-click="handleCellClick"
    @cell-dblclick="handleCellDblclick"
    @cell-contextmenu="handleCellContextMenu"
    @row-click="handleRowClick"
    @row-contextmenu="handleRowCentextMenu"
    @row-dblclick="handleRowDblclick"
    @header-click="handleHeaderClick"
    @header-contextmenu="handleHeaderContextMenu"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
    @current-change="handleCurrentChange"
    @header-dragend="handleHeaderDragend"
    @expand-change="handleExpandChange"
  >
    <template #default="scope">
      <slot
        :row="scope.row"
        :$index="scope.$index"
        :column="scope.column"
      ></slot>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { ElTable } from "element-plus";
import { ColumnStyle } from "element-plus/es/components/table/src/table/defaults";

import { nextTick, ref } from "vue";
// 属性接口
interface ItableProps {
  data?: any[];
  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean;
  border?: boolean;
  size?: "large" | "default" | "small";
  fit?: boolean;
  showHeader?: boolean;
  highlightCurrentRow?: boolean;
  currentRowKey?: string | number;
  rowClassName?: string | ((obj: { row: any; rowIndex: number }) => any);
  rowStyle?: ColumnStyle<any>;
  cellClassName?:
    | string
    | ((obj: {
        row: any;
        column: any;
        rowIndex: number;
        columnIndex: number;
      }) => any);
  cellStyle?:
    | { [key: string]: any }
    | ((obj: {
        row: any;
        column: any;
        rowIndex: number;
        columnIndex: number;
      }) => any);
  headerRowClassName?: string | ((obj: { row: any; rowIndex: number }) => any);
  headerRowStyle?:
    | { [key: string]: any }
    | ((obj: { row: any; rowIndex: number }) => any);
  headerCellStyle?:
    | { [key: string]: any }
    | ((obj: {
        row: any;
        column: any;
        rowIndex: number;
        columnIndex: number;
      }) => any);
  rowKey?: string | ((row: any) => any);
  emptyText?: string;
  defaultExpandAll?: boolean;
  expandRowKeys?: [];
  defaultSort?: { prop: string; order: "ascending" | "descending" };
  tooltipEffect?: "dark" | "light";
  showSummary?: boolean;
  sumText?: string;
  summaryMethod?: (obj: { columns: any; data: any }) => any;
  spanMethod?: (obj: {
    row: any;
    column: any;
    rowIndex: number;
    columnIndex: number;
  }) => any;
  selectOnIndeterminate?: boolean;
  indent?: number;
  lazy?: boolean;
  load?: (row: any, treeNode: any, resolve: any) => any;
  treeProps?: { hasChildren: string; children: string };
  tableLayout?: "fixed" | "auto";
  scrollbarAlwaysOn?: boolean;
  flexible?: boolean;
  headerColor: string;
}

// 属性添加默认值
const props = withDefaults(defineProps<ItableProps>(), {
  stripe: false,
  border: false,
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  emptyText: "No Data",
  defaultExpandAll: false,
  defaultSort: () => {
    return { prop: "", order: "ascending" };
  },
  tooltipEffect: "dark",
  showSummary: false,
  sumText: "合计",
  selectOnIndeterminate: true,
  indent: 16,
  treeProps: () => {
    return { hasChildren: "hasChildren", children: "children" };
  },
  tableLayout: "fixed",
  scrollbarAlwaysOn: false,
  flexible: false,
  headerColor: "#ffffff",
  // #3d7eff
});

// 事件接口
interface ItableEmit {
  (e: "select", selection: any, row: any): void;
  (e: "select-all", selection: any): void;
  (e: "selection-change", selection: any): void;
  (e: "cell-mouse-enter", row: any, column: any, cell: any, event: any): void;
  (e: "cell-mouse-leave", row: any, column: any, cell: any, event: any): void;
  (e: "cell-click", row: any, column: any, cell: any, event: any): void;
  (e: "cell-dblclick", row: any, column: any, cell: any, event: any): void;
  (e: "cell-contextmenu", row: any, column: any, cell: any, event: any): void;
  (e: "row-click", row: any, column: any, event: any): void;
  (e: "row-contextmenu", row: any, column: any, event: any): void;
  (e: "row-dblclick", row: any, column: any, event: any): void;
  (e: "header-click", column: any, event: any): void;
  (e: "header-contextmenu", column: any, event: any): void;
  (e: "sort-change", column: any, prop: any, order: any): void;
  (e: "filter-change", filters: any): void;
  (e: "current-change", currentRow: any, oldCurrentKey: any): void;
  (
    e: "header-dragend",
    newWidth: any,
    oldWidth: any,
    column: any,
    event: any
  ): void;
  (e: "expand-change", row: any, expanded: any): void;
}
const emit = defineEmits<ItableEmit>();
function handleSelect(selection: any, row: any): void {
  emit("select", selection, row);
}
function handleSelectAll(selection: any): void {
  emit("select-all", selection);
}
function handleSelectionChange(selection: any): void {
  emit("selection-change", selection);
}
function handleCellMouseEnter(
  row: any,
  column: any,
  cell: any,
  event: any
): void {
  emit("cell-mouse-enter", row, column, cell, event);
}
function handleCellMouseLeave(
  row: any,
  column: any,
  cell: any,
  event: any
): void {
  emit("cell-mouse-leave", row, column, cell, event);
}
function handleCellClick(row: any, column: any, cell: any, event: any): void {
  emit("cell-click", row, column, cell, event);
}
function handleCellDblclick(
  row: any,
  column: any,
  cell: any,
  event: any
): void {
  emit("cell-dblclick", row, column, cell, event);
}
function handleCellContextMenu(
  row: any,
  column: any,
  cell: any,
  event: any
): void {
  emit("cell-contextmenu", row, column, cell, event);
}
function handleRowClick(row: any, column: any, event: any): void {
  emit("row-click", row, column, event);
}
function handleRowCentextMenu(row: any, column: any, event: any): void {
  emit("row-contextmenu", row, column, event);
}
function handleRowDblclick(row: any, column: any, event: any): void {
  emit("row-dblclick", row, column, event);
}
function handleHeaderClick(column: any, event: any): void {
  emit("header-click", column, event);
}
function handleHeaderContextMenu(column: any, event: any): void {
  emit("header-contextmenu", column, event);
}
function handleSortChange(column: any, prop: any, order: any): void {
  emit("sort-change", column, prop, order);
}
function handleFilterChange(filters: any): void {
  emit("filter-change", filters);
}
function handleCurrentChange(currentRow: any, oldCurrentKey: any): void {
  emit("current-change", currentRow, oldCurrentKey);
}
function handleHeaderDragend(
  newWidth: any,
  oldWidth: any,
  column: any,
  event: any
): void {
  emit("header-dragend", newWidth, oldWidth, column, event);
}
function handleExpandChange(row: any, expanded: any): void {
  emit("expand-change", row, expanded);
}

// table上的方法
const elTableRef = ref<InstanceType<typeof ElTable>>();

const clearSelection = ref<(() => void) | undefined>();
const getSelectionRows = ref<(() => any) | undefined>();
const toggleRowSelection = ref<
  ((row: any, selected: boolean) => void) | undefined
>();
const toggleAllSelection = ref<(() => void) | undefined>();
const toggleRowExpansion = ref<
  ((row: any, expanded: boolean) => void) | undefined
>();
const setCurrentRow = ref<((row: any) => void) | undefined>();
const clearSort = ref<(() => void) | undefined>();
const clearFilter = ref<((columnKeys: string[]) => void) | undefined>();
const doLayout = ref<(() => void) | undefined>();
const sort = ref<((prop: string, order: string) => void) | undefined>();
const scrollTo = ref<
  | ((options: number | ScrollToOptions, yCoord?: number | undefined) => void)
  | undefined
>();
const setScrollTop = ref<(() => void) | undefined>();
const setScrollLeft = ref<(() => void) | undefined>();

nextTick(() => {
  clearSelection.value = elTableRef.value?.clearSelection;
  getSelectionRows.value = elTableRef.value?.getSelectionRows;
  toggleRowSelection.value = elTableRef.value?.toggleRowSelection;
  toggleAllSelection.value = elTableRef.value?.toggleAllSelection;
  toggleRowExpansion.value = elTableRef.value?.toggleRowExpansion;
  setCurrentRow.value = elTableRef.value?.setCurrentRow;
  clearSort.value = elTableRef.value?.clearSort;
  clearFilter.value = elTableRef.value?.clearFilter;
  doLayout.value = elTableRef.value?.doLayout;
  sort.value = elTableRef.value?.sort;
  scrollTo.value = elTableRef.value?.scrollTo;
  setScrollTop.value = elTableRef.value?.setScrollTop;
  setScrollLeft.value = elTableRef.value?.setScrollLeft;
});
defineExpose({
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft,
});

// console.log(a)
</script>

<style lang="scss" scoped>
$headerColor:v-bind(headerColor);

@function set-color($color) {
  @if (lightness($color) > 40) {
    @return #000;
  } @else {
    @return #fff;
  }
}

:deep(.el-table__header) {
  .el-table__cell {
    font-size: 12px !important;
    width: 1323px !important;
    height: 18px !important;
    background: $headerColor !important;
    padding: 2px 0;
    color: #ffffff;
    .cell {
      line-height: 14px;
      height: 14px;
      padding: 0;
      .el-checkbox__inner {
        background-color: $headerColor;
        border: 1px solid #ffffff;
      }
    }
  }
}

:deep(.el-table__row) {
  padding: 0;
  .el-table__cell {
    padding: 3px 0;
    .cell {
      line-height: 14px;
      height: 14px;
    }
  }
  .el-link {
    font-size: 12px;
  }
  .el-link.hoverChange:hover {
    color: #ffffff;
    background-color: #01cba5;
  }
  .el-link.underLine {
    text-decoration: underline;
  }
  .cell {
    padding: 0;
  }
}
</style>

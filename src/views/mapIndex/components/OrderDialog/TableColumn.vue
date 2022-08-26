<template>
  <el-table-column
    :type="type"
    :index="index"
    :label="label"
    :column-key="props.columnKey"
    :prop="prop"
    :width="width"
    :min-width="minWidth"
    :fixed="fixed"
    :render-header="renderHeader"
    :sortable="sortable"
    :sort-method="sortMethod"
    :sort-by="sortBy"
    :sort-orders="sortOrders"
    :resizable="resizable"
    :formatter="formatter"
    :show-overflow-tooltip="showOverflowTooltip"
    :align="align"
    :header-align="headerAlign"
    :class-name="className"
    :label-class-name="labelClassName"
    :selectable="selectable"
    :reserve-selection="reserveSelection"
    :filters="filters"
    :filter-placement="filterPlacement"
    :filter-multiple="filterMultiple"
    :filter-method="filterMethod"
    :filtered-value="filteredValue"
  >
    <template #default="scope" v-if="type === undefined">
      <slot :row="scope.row" :$index="scope.$index" :column="scope.column"></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">

// 定义el-table-column上的属性接口
interface IColumnProps {
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


const props = withDefaults(defineProps<IColumnProps>(), {
  sortable: false,
  sortOrders: () => ["ascending", "descending", null],
  resizable: true,
  showOverflowTooltip: false,
  align: "left",
  reserveSelection: false,
  filterMultiple: true,
});



</script>

<style lang="scss" scoped>
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

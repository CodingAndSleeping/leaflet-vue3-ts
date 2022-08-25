<template>
  <!-- <el-table
  >
   <template #default="scope">
      <slot :row="scope.row" :$index="scope.$index" :column="scope.column"></slot>
    </template>
  </el-table> -->
</template>

<script setup lang="ts">
import { ref } from "vue";

// 属性
interface ItableProps {
  // clearSelection:
}

// 事件
const emit =  defineEmits<{
  
}>()




</script>

<style lang="scss" scoped>
:deep(.header-row) {
  .el-table__cell {
    font-size: 12px !important;
    width: 1323px !important;
    height: 18px !important;
    background: #3d7eff !important;
    padding: 2px 0;
    color: #ffffff;
    .cell {
      line-height: 14px;
      height: 14px;
      padding: 0;
      .el-checkbox__inner {
        background-color: #3d7eff;
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

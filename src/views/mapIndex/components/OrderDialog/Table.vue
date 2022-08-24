<template>
  <el-table
    ref="multipleTableRef"
    :data="infoList"
    style="width: 100%"
    stripe
    header-row-class-name="header-row"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="33" align="center" />
    <el-table-column
      v-for="item in tableColumns"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      align="left"
      show-overflow-tooltip
    >
      <template #default="scpoe">
        <div v-if="item.soltName">
          <div v-if="item.soltName == 'operate'">
            <el-link class="hoverChange" type="success" :underline="false"
              >详细审核</el-link
            >&ensp;
            <el-link class="hoverChange" type="success" :underline="false"
              >直接通过</el-link
            >
          </div>
          <div v-if="item.soltName == 'back'">
            <el-link type="danger" :underline="false">退回</el-link>
          </div>
          <div v-if="item.soltName == 'detail'">
            <el-link type="primary" :underline="false">详情</el-link>
          </div>

          <div v-if="item.soltName == 'detailCode'">
            <el-link class="underLine" type="primary" :underline="false">{{
              scpoe.row.detailCode
            }}</el-link>
          </div>
        </div>
        <div v-else>{{ scpoe.row[item.prop] }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ListInfo } from "./types/tableListInfo";
import { tableColumns } from "./utils/orderTableColumns";
defineProps<{
  loading: boolean;
  infoList: ListInfo[];
}>();
const multipleSelection = ref<ListInfo[]>();
function handleSelectionChange(val: ListInfo[]) {
  multipleSelection.value = val;
}
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

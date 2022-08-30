<template>
  <Dialog v-model="visible">
    <template #header="scope">
      <!-- {{scope}} -->
      <DialogHeader
        title="电子海图订单"
        @close="visible = !visible"
      ></DialogHeader>
    </template>
    <template #default>
      <div class="chart-order">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item class="exportIcon">
            <el-icon class="export"><Upload /></el-icon>
          </el-form-item>
          <el-form-item size="small" class="paysId">
            <el-input
              v-model="form.paysId"
              placeholder="查询订单编号"
              suffix-icon="Search"
              size="small"
            />
          </el-form-item>
          <el-form-item size="small" class="shipName">
            <el-input
              v-model="form.shipName"
              placeholder="船舶名称"
              suffix-icon="Search"
              size="small"
            />
          </el-form-item>
          <el-form-item label="供应商" size="small" class="supplier">
            <el-select v-model="form.supplier" placeholder="全部供应商">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" size="small">
            <el-date-picker
              class="datePicker"
              v-model="form.createTime"
              type="daterange"
              size="small"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item size="small">
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>

        <div class="stateBtn">
          <el-button-group>
            <el-button
              :class="{ active: currentTabName === '查看全部' }"
              @click="currentTabName = '查看全部'"
              >查看全部</el-button
            >
            <el-button
              :class="{ active: currentTabName === '待提交' }"
              @click="currentTabName = '待提交'"
              >待提交</el-button
            >
            <el-button
              :class="{ active: currentTabName === '待审核' }"
              @click="currentTabName = '待审核'"
              >待审核</el-button
            >
            <el-button
              :class="{ active: currentTabName === '待发货' }"
              @click="currentTabName = '待发货'"
              >待发货</el-button
            >
            <el-button
              :class="{ active: currentTabName === '待签收' }"
              @click="currentTabName = '待签收'"
              >待签收</el-button
            >
            <el-button
              :class="{ active: currentTabName === '待结算' }"
              @click="currentTabName = '待结算'"
              >待结算</el-button
            >
          </el-button-group>
        </div>

        <Table
          :data="infoList"
          header-background-color="#3d7eff"
          header-font-color="#ffffff"
          ref="tableRef"
        >
          <TableColumn type="selection" width="33" align="center">
          </TableColumn>
          <TableColumn
            v-for="(item, index) in tableColumns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="left"
            show-overflow-tooltip
          >
            <template #default="scope">
              <div v-if="item.soltName">
                <div v-if="item.soltName == 'operate'">
                  <link-text type="success"> 详细审核 </link-text>
                  &ensp;
                  <link-text type="success"> 直接通过 </link-text>
                </div>
                <div v-if="item.soltName == 'back'">
                  <el-link type="danger" :underline="false">退回</el-link>
                </div>
                <div v-if="item.soltName == 'detail'">
                  <el-link type="primary" :underline="false">详情</el-link>
                </div>

                <div v-if="item.soltName == 'detailCode'">
                  <el-link
                    class="underLine"
                    type="primary"
                    :underline="false"
                    >{{ scope.row.detailCode }}</el-link
                  >
                </div>
              </div>
              <div v-else>{{ scope.row[item.prop] }}</div>
            </template>
          </TableColumn>
        </Table>

        <div class="pagination">
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :small="true"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          <el-button>确定</el-button>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
// table组件
import Table from "./Table.vue";
// tableColumn组件
import TableColumn from "./TableColumn.vue";
// dialog组件
import Dialog from "./Dialog.vue";
// dialogHeader组件
import DialogHeader from "./DialogHeader.vue";

import LinkText from "@/components/LinkText";

import { tableColumns } from "./utils/orderTableColumns";
//  table数据字段接口
import { ListInfo } from "./types/tableListInfo";
import { ElTable } from "element-plus";

const visible = ref<boolean>(true);

// 输入表单内容
const form = reactive<{
  paysId: string;
  shipName: string;
  supplier: string;
  createTime: string;
}>({
  paysId: "",
  shipName: "",
  supplier: "",
  createTime: "",
});

const currentTabName = ref<string>("查看全部");

// 模拟数据
const infoList = reactive<ListInfo[]>([
  {
    index: 1,
    code: "hsahajhajajhjajhhah120255888755",
    shipName: "南沙荣光",
    submitName: "芮君",
    submitDate: "2016-05-02",
    lineName: "TAIWAN STRAIT SOUTH OF WUQIU @",
    state: "待下单",
    currency: "美元",
    price: 563.3,
    supplierName: "UKHO",
    detailCode: "XZAD123",
  },
  {
    index: 1,
    code: "hsahajhajajhjajhhah120255888755",
    shipName: "南沙荣光",
    submitName: "芮君",
    submitDate: "2016-05-02",
    lineName: "TAIWAN STRAIT SOUTH OF WUQIU @",
    state: "待下单",
    currency: "美元",
    price: 563.3,
    supplierName: "UKHO",

    detailCode: "XZAD123",
  },
  {
    index: 1,
    code: "hsahajhajajhjajhhah120255888755",
    shipName: "南沙荣光",
    submitName: "芮君",
    submitDate: "2016-05-02",
    lineName: "TAIWAN STRAIT SOUTH OF WUQIU @",
    state: "待下单",
    currency: "美元",
    price: 563.3,
    supplierName: "UKHO",
    detailCode: "XZAD123",
  },
]);

// 分页
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(110);
function handleSizeChange(val: number) {
  console.log(val);
}
function handleCurrentChange(val: number) {
  console.log(val);
}
const tableRef = ref<InstanceType<typeof ElTable>>();

// nextTick(() => {
//   console.log(tableRef.value);
//   const fns = tableRef.value;
//   nextTick(() => {
//     console.log(fns?.clearSelection);
//   });
// });
</script>

<style lang="scss" scoped>
.chart-order {
  background: #fff;
  padding: 10px;
}
.demo-form-inline {
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
  .exportIcon {
    width: 26px;
    height: 24px;
    background-color: #ffffff;
    border: 1px solid #bfc3cf; // 给导出图标加外边框
    border-radius: 2px;
    .export {
      margin: 4px 5px;
    }
  }
  .exportIcon:hover {
    //导出图标鼠标移入样式
    cursor: pointer;
    color: #ffffff;
    background-color: #3d7eff;
  }
  .el-input {
    width: 160px;
    height: 24px;
  }

  label {
    height: 24px;
    font-size: 12px;
    color: #333333;
    line-height: 24px;
  }

  .datePicker {
    width: 190px;
    height: 24px;
  }

  .el-button {
    width: 60px;
    height: 24px;
    background: #3d7eff;
    border-radius: 2px;
  }
  .el-button:hover {
    opacity: 50%;
  }
}

// 切换标签按钮
.stateBtn {
  margin-top: 10px;
  .el-button {
    width: 100px;
    height: 28px;
    border: 1px solid #cccccc;
    border-radius: 0px 2px 2px 0px;
  }
}

:deep(.el-link) {
  font-size: 12px;
  padding: 0 !important;
}

// 分页器
.pagination {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .el-input {
    width: 94px;
    height: 20px;
    background: #ffffff;
    border: 1px solid #f1f4f5;
    border-radius: 2px;
  }
  .btn-prev,
  .btn-next {
    width: 31px;
    height: 20px;
    background: #ffffff;
    border: 1px solid #f1f4f5;
    border-radius: 2px;
  }

  .number,
  .more {
    width: 31px;
    height: 20px;
    background-color: #ffffff;
    border: 1px solid #f1f4f5;
    border-radius: 2px;
  }

  .number.is-active {
    background-color: #3d7eff;
    color: #ffffff;
  }

  .el-button {
    width: 52px;
    height: 20px;
    background-color: #3d7eff;
    border-radius: 2px;
    font-size: 12px;
    color: #ffffff;
  }
  .el-button:hover {
    opacity: 50%;
  }
}

.active {
  // 标签按钮选中状态
  width: 100px;
  height: 28px;
  background-color: #3d7eff;
  border-radius: 2px 0px 0px 2px;
  font-size: 14px;
  color: #ffffff;
}
</style>

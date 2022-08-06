<template>
  <div class="order-dialog">
    <el-dialog
      v-model="dialogTableVisible"
      :show-close="false"
      top="10vh"
      width="70vw"
    >
      <template #header>
        <span>电子海图订单</span>
        <div class="closeBtn">
          <el-icon><ArrowDown /></el-icon>
          <el-icon><Close /></el-icon>
        </div>
      </template>
      <div class="content">
        <!-- 输入表单 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <!-- 导出图标 -->
          <el-form-item class="exportIcon">
            <el-icon><Upload /></el-icon>
          </el-form-item>
          <!-- 查询订单 -->
          <el-form-item size="small" class="paysId">
            <el-input
              v-model="form.paysId"
              placeholder="查询订单编号"
              suffix-icon="Search"
              size="small"
            />
          </el-form-item>
          <!-- 查询船舶名称 -->
          <el-form-item size="small" class="shipName">
            <el-input
              v-model="form.shipName"
              placeholder="船舶名称"
              suffix-icon="Search"
              size="small"
            />
          </el-form-item>
          <!-- 选择供应商 -->
          <el-form-item label="供应商" size="small" class="supplier">
            <el-select v-model="form.supplier" placeholder="全部供应商">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <!-- 选择创建时间 -->
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
          <!-- 查询按钮 -->
          <el-form-item size="small">
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>

        <!-- 状态按钮 -->
        <div class="stateBtn">
          <el-button-group>
            <el-button class="active">查看全部</el-button>
            <el-button>待提交</el-button>
            <el-button>待审核</el-button>
            <el-button>待发货</el-button>
            <el-button>待签收</el-button>
            <el-button>待结算</el-button>
          </el-button-group>
        </div>

        <!-- table -->
        <el-table
          ref="multipleTableRef"
          :data="gridData"
          style="width: 100%"
          stripe
          header-row-class-name="headerRow"
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
                  >
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
                  <el-link class="underLine" type="primary" :underline="false"
                    >XZAD123</el-link
                  >
                </div>
              </div>
              <div v-else>{{ scpoe.row[item.prop] }}</div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <div class="pagination">
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :small="true"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          />
          <el-button>确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { tableColumns } from "./utils/orderTableColumns";
const dialogTableVisible = ref<boolean>(true);

// 表单数据
const form = reactive({
  paysId: "",
  shipName: "",
  supplier: "",
  createTime: "",
});

// 模拟数据
const gridData = [
  {
    index: 1,
    code: "hsahajhajajhjajhhah120255888755",
    shipName: "南沙荣光",
    submitName: "芮君",
    submitDate: "2016-05-02",
    lineName: "TAIWAN STRAIT SOUTH OF WUQIU @",
    state: "待下单",
    currency: "美元",
    price: "563.3",
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
    price: "563.3",
    supplierName: "UKHO",
    operate: "详细审核直接通过",
    back: "退回",
    detail: "详情",
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
    price: "563.3",
    supplierName: "UKHO",
    operate: "详细审核直接通过",
    back: "退回",
    detail: "详情",
    detailCode: "XZAD123",
  },
];

const multipleSelection = ref([]);
function handleSelectionChange(val) {
  multipleSelection.value = val;
}

const currentPage = ref<number>(1);
const pageSize = ref<number>(14);
const total = ref<number>(100);
</script>

<style lang="scss" scoped>
.order-dialog {
  :deep(.el-dialog) {
    padding: 0;
    background-color: #eff2f5;
    width: 1360px;
    height: 468px;
    .el-dialog__header {
      margin: 0;
      padding: 0;
      height: 36px;
      width: 1360px;
      background: #f2f7ff;
      border-radius: 2px 2px 0px 0px;
      border-bottom: 1px solid #bfc3cf;
      color: #999bb2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-left: 17px;
      }
      .closeBtn {
        display: flex;
        align-items: center;
        margin-right: 16px;
        .el-icon {
          margin: 0 0 0 0.3vw;
          cursor: pointer;
        }
      }
    }
    .el-dialog__body {
      padding: 0;

      .content {
        margin: 6px 8px;
        background-color: #ffffff;
        padding: 10px 10px;
        height: 400px;
        background: #ffffff;
        border-radius: 2px;

        .demo-form-inline {
          .el-form-item {
            margin-right: 20px;
            margin-bottom: 0;
          }
          .exportIcon {
            width: 26px;
            height: 24px;
            background: #ffffff;
            border: 1px solid #bfc3cf;
            border-radius: 2px;
            .el-icon {
              margin: 4px 5px;
            }
          }
          .el-input {
            width: 160px;
            height: 24px;
          }

          label {
            height: 24px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
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
        }

        .stateBtn {
          margin-top: 10px;
          .el-button {
            width: 100px;
            height: 28px;
            border: 1px solid #cccccc;
            border-radius: 0px 2px 2px 0px;
          }
        }

        .el-table {
          margin-top: 1px;
          font-size: 12px;
        }

        .headerRow {
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
        .el-table__row {
          // height: 20px;
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

        .pagination {
          display: flex;
          align-items: center;
          position: absolute;
          right: 19px;
          bottom: 17px;
          .el-button {
            width: 52px;
            height: 20px;
            background: #3d7eff;
            border-radius: 2px;
            font-size: 12px;
            color: #ffffff;
          }
          .is-active {
            background-color: #3d7eff;
          }
        }
      }
    }
  }
}

.active {
  background-color: #3d7eff;
  color: #ffffff;
}
</style>

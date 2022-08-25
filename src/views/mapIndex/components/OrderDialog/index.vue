<template>
  <div class="order-dialog">
    <el-dialog v-model="visible" :show-close="false">
      <template #header>
        <DialogHeader
          title="电子海图订单"
          :visible="visible"
          @close="visible = !visible"
        ></DialogHeader>
      </template>
      <div class="content">
        <!-- 输入表单 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <!-- 导出图标 -->
          <el-form-item class="exportIcon">
            <el-icon class="export"><Upload /></el-icon>
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
        <Table :loading="true" :info-list="infoList"></Table>

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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          <el-button>确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
// table组件
import Table from "./Table.vue";
// header组件
import DialogHeader from "./DialogHeader.vue";

//  table数据字段接口
import { ListInfo } from "./types/tableListInfo";

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
</script>

<style lang="scss" scoped>
.order-dialog {
  // dialog样式
  :deep(.el-dialog) {
    margin-top: 139px !important;
    padding: 0;
    background-color: #eff2f5;
    width: 1360px;
    height: 468px;
    // dialog里面header样式
    // .el-dialog__header {
    //   margin: 0;
    //   padding: 0;
    //   height: 36px;
    //   width: 1360px;
    //   background: #f2f7ff;
    //   border-radius: 2px 2px 0px 0px;
    //   border-bottom: 1px solid #bfc3cf;
    //   color: #999bb2;
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    // }
    // dialog里面body样式
    .el-dialog__body {
      // padding: 0;
      .content {
        margin: 6px 8px;
        background-color: #ffffff;
        padding: 10px 10px;
        width: 1324px;
        height: 399px;
        border-radius: 2px;

        // 表单行
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
        // 分页器
        .pagination {
          display: flex;
          align-items: center;

          position: absolute;
          right: 19px;
          bottom: 17px;
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
      }
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
}
</style>

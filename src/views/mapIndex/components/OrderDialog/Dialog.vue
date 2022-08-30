<template>
  <div class="dialog">
    <el-dialog
      v-model="modelValue"
      :title="title"
      :width="width"
      :fullscreen="fullscreen"
      :top="top"
      :modal="modal"
      :append-to-body="appendToBody"
      :lock-scroll="lockScroll"
      :custom-class="customClass"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :before-close="beforeClose"
      :draggable="draggable"
      :center="center"
      :destroy-on-close="destoryOnClose"
      @open="handleOpen"
      @opened="handleOpened"
      @close="handleClose"
      @closed="handleClosed"
      @open-auto-focus="handleOpenAutoFocus"
      @close-auto-focus="handleCloseAutoFocus"
      @update:modelValue="updateModelVlaue"
    >
      <!-- 弹窗header区域 -->
      <template #header="scope">
        <slot name="header" :close="scope"> </slot>
      </template>

      <!-- 弹窗body区域 -->
      <template #default>
        <div class="dialog-body" v-show="!isHidden">
          <slot> </slot>
        </div>
      </template>

      <!-- 弹窗footer区域 -->
      <template #footer>
        <div class="dialog-footer" v-show="!isHidden">
          <slot name="footer"> </slot>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { provide, ref } from "vue";
// el-dialog属性接口
interface IdialogProps {
  modelValue?: boolean;
  title?: string;
  width?: string | number;
  fullscreen?: boolean;
  top?: string;
  modal?: boolean;
  appendToBody?: boolean;
  lockScroll?: boolean;
  customClass?: string;
  openDelay?: number;
  closeDelay?: number;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  showClose?: boolean;
  beforeClose?: (done: (cancel?: boolean) => void) => void;
  draggable?: boolean;
  center?: boolean;
  destoryOnClose?: boolean;
  height?: string;
}
// dialog属性默认值
const props = withDefaults(defineProps<IdialogProps>(), {
  width: "50%",
  fullscreen: false,
  top: "15vh",
  modal: true,
  appendToBody: false,
  lockScroll: true,
  openDelay: 0,
  cloaseDelay: 0,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: false,
  draggable: false,
  center: false,
  destoryOnClose: false,
  height: "",
});
// el-dialog事件接口
interface IdialogEmit {
  (e: "open"): void;
  (e: "opened"): void;
  (e: "close"): void;
  (e: "closed"): void;
  (e: "open-auto-focus"): void;
  (e: "close-auto-focus"): void;
  (e: "update:modelValue", value: boolean): void;
}
// 接收父组件传递的事件
const emit = defineEmits<IdialogEmit>();

// 触发事件函数
function handleOpen() {
  emit("open");
}
function handleOpened() {
  emit("opened");
}
function handleClose() {
  emit("closed");
}
function handleClosed() {
  emit("closed");
}
function handleOpenAutoFocus() {
  emit("open-auto-focus");
}
function handleCloseAutoFocus() {
  emit("close-auto-focus");
}
function updateModelVlaue(value: boolean) {
  emit("update:modelValue", value);
}

const isHidden = ref<boolean>(false);
provide("changeHidden", (val: boolean) => {
  isHidden.value = val;
});

const height: string = props.height; // 高度常量
//  响应性高度变量，并将 props.height 赋值给它 
const tempHeight = ref<string>(); // 
tempHeight.value = props.height;
provide("height", height);
provide("changeHeight", (val: string) => {
  tempHeight.value = val;
});
</script>

<style lang="scss" scoped>
.dialog {
  // 修改默认弹窗样式
  :deep(.el-dialog) {
    margin-top: 139px !important;
    padding: 0;
    background-color: #eff2f5;
    width: 1360px;

    // 修改弹窗头部默认样式
    .el-dialog__header {
      margin: 0;
      padding: 0;
      width: 1360px;
    }

    // 修改弹窗内容区域默认样式
    .el-dialog__body {
      padding: 0;
      width: 1360px;
      height: v-bind(tempHeight);
    }

    .el-dialog__footer {
      padding: 0;
      width: 1360;
    }

    .dialog-body {
      padding: 6px 8px;
      box-sizing: border-box;
    }
    .dialog-footer {
    }

    .hidden {
      display: none;
      height: 0;
    }
  }
}
</style>

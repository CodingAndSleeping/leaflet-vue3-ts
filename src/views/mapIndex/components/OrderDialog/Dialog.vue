<template>
  <div class="dialog">
    <el-dialog
      :model-value="modelValue"
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
      @update:model-value="updateModelVlaue"
    >
      <template #header>
        <slot name="header"> </slot>
      </template>

      <template #default>
        <slot> </slot>
      </template>

      <template #footer>
        <slot name="footer"> </slot>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
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
}

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
});

interface IdialogEmit {
  (e: "open"): void;
  (e: "opened"): void;
  (e: "close"): void;
  (e: "closed"): void;
  (e: "open-auto-focus"): void;
  (e: "close-auto-focus"): void;
  (e: "update:model-value", value: boolean): void;
}

const emit = defineEmits<IdialogEmit>();

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
  emit("update:model-value", value);
}
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.el-dialog) {
    margin-top: 139px !important;
    padding: 0;
    background-color: #eff2f5;
    width: 1360px;
    height: 468px;
    .el-dialog__body {
        margin: 6px 8px;
        background-color: #ffffff;
        padding: 10px 10px;
        width: 1324px;
        height: 399px;
        border-radius: 2px;
    }
  }
}
</style>

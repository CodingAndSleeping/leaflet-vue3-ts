<template>
  <span class="dialog-header">{{ title }}</span>
  <div class="right-btn">
    <el-icon><ArrowDown /></el-icon>
    <el-icon @click="handleClose"><Close /></el-icon>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
}>();
const emits = defineEmits<{
  (e: "close"): void;
}>();

function handleClose() {
  emits("close");
}
</script>

<style lang="scss" scoped>
.dialog-header {
  margin-left: 17px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #848dae;
}
.right-btn {
  display: flex;
  align-items: center;
  margin-right: 16px;
  .el-icon {
    margin: 0 0 0 14px;
    cursor: pointer;
  }

  .el-icon:hover {
    background-color: #3d7eff;
  }
}
</style>

<template>
  <div class="dialog-header">
    <span class="dialog-title">{{ title }}</span>
    <div class="right-btn">
      <el-icon @click="handleHidden"><ArrowDown /></el-icon>
      <el-icon @click="handleClose"><Close /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
defineProps<{
  title: string;
  showHiddenBtn:boolean,
  backgroundColor:string,
  fontColor:string
}>();
const emits = defineEmits<{
  (e: "close"): void;
}>();

const handleClose = (): void => {
  emits("close");
};


const isHidden = ref<boolean>(false); // 在本组件定义一个是否隐藏的变量
const changeHidden = inject<(val:boolean)=>void>("changeHidden"); // inject changeHidden函数 用于改变父组件里的isHidden变量

const changeHeight = inject<(val:string)=>void>("changeHeight"); // inject changeHeight函数 用于改变父组件里的Height
const height = inject<string>("height"); // 定义一个非响应性的常量接受初始高度；

function handleHidden(){
  isHidden.value = !isHidden.value; // 改变isHidden
  (changeHidden as Function)(isHidden.value); // 调用 changeHidden 函数，传入isHidden的值
  if(isHidden.value){ // 判断idHidden的值，来调用changeHeight函数 并传入不同的值
    (changeHeight as Function)("0");
  }else{
    (changeHeight as Function)(height);
  }
}
</script>

<style lang="scss" scoped>
.dialog-header {
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f2f7ff;
  border-radius: 2px 2px 0px 0px;
  border-bottom: 1px solid #bfc3cf;
  color: #999bb2;
  .dialog-title {
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
}
</style>

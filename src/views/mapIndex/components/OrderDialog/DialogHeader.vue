<template>
  <div class="dialog-header" :style="style">
    <span class="dialog-title">{{ title }}</span>
    <div class="right-btn">
      <el-icon @click="handleHidden" v-if="isShowHiddenBtn"
        ><ArrowDown
      /></el-icon>
      <el-icon @click="handleClose"><Close /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from "vue";
interface IdialogHeaderProps {
  title?: string;
  heigt?:string;
  showHiddenBtn?:boolean;
  backgroundColor?:string;
  fontColor?:string;
  isShowHiddenBtn:boolean;
}
const props = withDefaults(defineProps<IdialogHeaderProps>(), {
  heigt:"36px",
  isShowHiddenBtn:true,
  backgroundColor:"#f2f7ff",
  fontColor:"#848dae"
});

const style = computed(()=>{
  return {
     "--backgroundColor": props.backgroundColor,
     "--fontColor": props.fontColor,
     "--height":props.heigt,
  }
})

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
  height: var(--height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--backgroundColor);
  border-radius: 2px 2px 0px 0px;
  border-bottom: 1px solid #bfc3cf;
  .dialog-title {
    margin-left: 17px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: var(--fontColor);
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

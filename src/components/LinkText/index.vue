<template>
    <el-link :type="type" :underline="underline" :disabled="disabled" :herf="href" :icon="icon" :class="{bg:background}">
      <slot name="icon"></slot>
      <slot></slot>
    </el-link>
    </template>
    
    <script setup>
    const props = defineProps({
      type:{ // 类型
        type:String,
        values: ['primary', 'success', 'warning', 'info', 'danger', 'default'],
        default:'default'
      },
      underline:{ // 下划线
        type:Boolean,
        default:false
      },
      disabled:{ // 是否禁用
        type:Boolean,
        default:false
      },
      href:{ // 链接
        type:String,
        default:''
      },
      background:{ // 是否显示背景
        type:Boolean,
        default:true
      },
      icon:''
    })
    </script>
    
    <style scoped lang="scss">
    .el-link{
      padding: 5px;
    }
    .el-link--primary.bg:hover{
      background: var(--el-color-primary);
      color: #FFFFFF;
    }
    .el-link--success.bg:hover{
      background: var(--el-color-success);
      color: #FFFFFF;
    }
    .el-link--warning.bg:hover{
      background: var(--el-color-warning);
      color: #FFFFFF;
    }
    .el-link--info.bg:hover{
      background: var(--el-color-info);
      color: #FFFFFF;
    }
    .el-link--danger.bg:hover{
      background: var(--el-color-danger);
      color: #FFFFFF;
    }
    </style>
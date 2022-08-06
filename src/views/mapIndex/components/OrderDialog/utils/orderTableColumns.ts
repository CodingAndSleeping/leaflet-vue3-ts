import {Icolumns} from '../types/tableColumns';
export const tableColumns:Icolumns[] = 
    [
        {
            label:"序号",
            prop: "index",
            width: 40
        },
        {
            label:"订单编号",
            prop: "code",
            width: 219
        },
        {
            label:"船舶名称",
            prop: "shipName",
            width: 74
        },
        {
            label:"提交人",
            prop: "submitName",
            width: 61
        },
        {
            label:"提交日期",
            prop: "submitDate",
            width: 90
        },
        {
            label:"航线名称",
            prop: "lineName",
            width: 240
        },
        {
            label:"状态",
            prop: "state",
            width: 65
        },
        {
            label:"币种",
            prop: "currency",
            width: 54
        },
        {
            label:"订单价格",
            prop: "price",
            width: 71
        },
        {
            label:"供应商",
            prop: "supplierName",
            width: 70
        },

        {
            label:"审核",
            prop: "operate",
            width: 122,
            soltName:"operate"
        },
        {
            label:"返回",
            prop: "back",
            width: 52,
            soltName:"back"
        },
        {
            label:"查看详情",
            prop: "detail",
            width: 71,
            soltName:"detail"
        },
        {
            label:"查看详情",
            prop:"detailCode",
            width:61,
            soltName:"detailCode"
        }

    ]
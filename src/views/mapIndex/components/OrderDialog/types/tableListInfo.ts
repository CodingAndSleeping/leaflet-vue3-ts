// 订单列表结果字段
export interface ListInfo {
    index: number;
    code: string;
    shipName: string;
    submitName: string;
    submitDate:string;
    lineName:string;
    state:string;
    currency:string;
    price:number;
    supplierName:string;
    operate?:string;
    back?:string;
    detail?:string;
    detailCode:string
  }
  
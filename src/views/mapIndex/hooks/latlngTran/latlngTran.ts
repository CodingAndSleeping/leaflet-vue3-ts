/**
 * 经度超过180之后的坐标转换
 * @param latlngs 经纬度数据
 * @return 转换后的经纬度数据
 */
export function latlngTrans(latlngs: Array<any>): Array<any> {
  latlngs.forEach((item: any, index: number, arr: Array<any>) => {
    if (item instanceof Array) {
      // 判断经纬度数据是否是数组形式
      if (index > 0) {
        if (arr[index - 1][1] > 0) {
          if (arr[index - 1][1] - item[1] > 180) {
            item[1] += 360;
          }
        } else {
          if (arr[index - 1][1] - item[1] < -180) {
            item[1] -= 360;
          }
        }
      }
    } else if (item.hasOwnProperty("lng")) {
      if (index > 0) {
        if (arr[index - 1].lng > 0) {
          if (arr[index - 1].lng - item.lng > 180) {
            item.lng += 360;
          }
        } else {
          if (arr[index - 1].lng - item.lng < -180) {
            item.lng -= 360;
          }
        }
      }
    } else if (item.hasOwnProperty("lon")) {
      if (index > 0) {
        if (arr[index - 1].lon > 0) {
          if (arr[index - 1].lon - item.lon > 180) {
            item.lon += 360;
          }
        } else {
          if (arr[index - 1].lon - item.lon < -180) {
            item.lon -= 360;
          }
        }
      }
    }
  });
  return latlngs;
}

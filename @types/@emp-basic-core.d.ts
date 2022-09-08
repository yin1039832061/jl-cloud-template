type StoresType = {
  [key: string]: (...args: any) => any;
};

declare module '@emp/basic-core/stores/index' {
  import React from 'react';

  type TstoreProviderProps = {
    children: React.ReactNode;
    stores?: StoresType;
  };
  export const StoreProvider: ({ children, stores }: TstoreProviderProps) => JSX.Element;
  export const useStores: () => any;
  export const getStores: () => any;
  export {};
}

declare module '@emp/basic-core/stores/config' {
  const stores: StoresType;
  export default stores;
}

declare module '@emp/basic-core/js/common' {
  export {
    lazy, // amis 懒加载函数
    isEmpty, // 判断字符串是否为空
    trim, // 删除左右两端的空格
    trimAll, // 删除全部空格
    getCurrentDate, // 获取当前日期
    getCurrentDateTime, // 获取当前日期和时间
    getCurrentTime, // 获取当前时间
    getYesterDay, // 获取昨天
    getFormatDate, // 格式化时间
    getPreMonth, // 获取上一个月
    getNextMonth, // 获取下一个月
    getWeekDays, // 获取近7天
    getThirtyDays, // 获取近30天
    getCurrentMonthFirst, // 获取某月第一天
    getTimeDescribeFn, // time和当前时间的差值
    getDateString, // 获取纯数字的时间
    getYearMonth, // 获取年月,可配置跨度
    getLastMonthScope, // 获取上个月起始时间
    getFormatYuanMoney, // 以分为单位的金额转换为以元为单位
    getFormatYuanAmt, // 以分为单位的金额转换为以元为单位(整数部分加千分号)
    getFormatFenAmt, // 以元为单位的金额转换为以分为单位
    setSession, // 存储sessionstarage
    getSession, // 获取sessionstarage
    removeSession, // 删除sessionstarage
    removeAllSession, // 删除 all sessionstarage
    setLocal, // 存储localstarage
    getLocal, // 获取localstarage
    removeLocal, // 移除localstarage
    removeAllLocal, // 移除所有localstarage
    rsaEncrypt, // 加密
    deepClone, // 深拷贝
    limitQueryTime, // 限制查询时间跨度
    lineToHump, // 下划线转驼峰
    queryStringParse, // 把字符串?type=404?解析成{type: 404}
    enum2object, // keyval转成枚举对象
    btnPermission, // 判断按钮权限方法
    uniqueId, // 生成唯一ID
  };
}

declare module '@emp/basic-core/js/axios' {
  const axiosCreate: (history: any) => any;
  export { axiosCreate };
}

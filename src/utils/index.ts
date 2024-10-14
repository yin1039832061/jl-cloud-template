import { FormInstance, message } from 'antd';
import { useEffect, useState } from 'react';
import { isNumber, isNaN } from 'lodash';
import { getBasePathApi } from '@/services/common';

// 手机号
export const regTel = /^(?:(?:\+|00)86)?1[3|4|5|6|7|8|9]\d{9}$/;
//澳门手机号
export const macauRegTel = /^(?:(?:\+|00)853)?6\d{7}$/;
// 验证码
export const regCode = /^\d{6}$/;
// 中文名字
export const regName =
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|[a-zA-Z]+$/;
// 电子邮箱
export const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
// 统一社会信用代码
export const regBusinessLicenseNo = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;
// 身份号
export const regCardID =
  /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;

export const getActionType = (module: string) => {
  return function getType(actionType: string) {
    return `${module}_${actionType}`;
  };
};
//file转dataurl
export const fileToURL = (file: File): Promise<string> => {
  let fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    if (window.URL || window.webkitURL) {
      resolve(URL.createObjectURL(file));
    } else {
      fileReader.onload = () => {
        fileReader?.result && resolve(fileReader.result as string);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
      fileReader.readAsDataURL(file);
    }
  });
};

//URL转Image
export const urlToImage = async (url: string): Promise<HTMLImageElement> => {
  let img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onload = function () {
      if (img.complete) resolve(img);
    };
  });
};

//Image转canvas
export const compressImage = async (
  img: HTMLImageElement,
  maxSize: number,
  name: string,
  mimeType: string,
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  let curQuality = 100;
  let compressFinish = false;
  let count = 0;
  let compressBlob;
  const maxQualitySize = { quality: 100, size: maxSize };
  const minQualitySize = { quality: 0, size: 0 };
  while (!compressFinish) {
    compressBlob = await canvaToBlob(canvas, 'image/jpeg', curQuality / 100);
    const compressSize = compressBlob.size / 1024;
    count++;
    if (compressSize === maxSize) {
      compressFinish = true;
      return;
    }
    if (compressSize > maxSize) {
      maxQualitySize.quality = curQuality;
      maxQualitySize.size = compressSize;
    }
    if (compressSize < maxSize) {
      minQualitySize.quality = curQuality;
      minQualitySize.size = compressSize;
    }
    curQuality = Math.ceil((maxQualitySize.quality + minQualitySize.quality) / 2);
    if (maxQualitySize.quality - minQualitySize.quality < 2) {
      if (!minQualitySize.size && curQuality) {
        curQuality = minQualitySize.quality;
      } else if (!minQualitySize.size && !curQuality) {
        compressFinish = true;
        //eslint-disable-next-line
        console.log('无法压缩到指定大小');
      } else if (minQualitySize.size > maxSize) {
        compressFinish = true;
        //eslint-disable-next-line
        console.log('无法压缩到指定大小');
      } else {
        compressFinish = true;
        curQuality = minQualitySize.quality;
      }
    }
  }
  compressBlob = await canvaToBlob(canvas, 'image/jpeg', curQuality / 100);
  const file = new File([compressBlob], name, { type: mimeType });
  return file;
};
const canvaToBlob = async (canvas, type, quality) => {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      type,
      quality,
    );
  });
};

// 过滤出数组中key为指定值的第一个选项
export const getItemByKV = <T>(list: T[], key: keyof T, value: unknown): T => {
  let item = list.filter((item) => item[key] == value)[0] || {};
  return item as T;
};

// 数字转千分位分隔金额
export const numberToPrice = (num: number | string) => {
  if (typeof num === 'string') num = Number(num);
  if (typeof num !== 'number' || isNaN(num)) {
    return '';
  }
  let str = num.toFixed(2);
  let arr = str.split('.');
  return `${arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}.${arr[1]}`;
};

export const useQuery = <T extends Record<string, string>>(): T => {
  if (typeof window === 'undefined') return {} as T;
  let result: Record<string, string> = {};
  const searchString = (window.location?.search || '')?.replace(/^\?/, '') || '';
  let arr = searchString.split('&');
  for (let item of arr) {
    let splitIndex = item.indexOf('=');
    if (splitIndex > 0) {
      result[item.substring(0, splitIndex)] = item.substring(splitIndex + 1);
    }
  }
  return result as T;
};
// 通过文件地址下载文件
export function downloadFileByUrl(url: string, fileName: string) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    let blob = new Blob([xhr.response], { type: 'octet/stream' });
    downloadStream(blob as unknown as Blob, fileName);
  };
  xhr.send();
}
// 流转文件
export const downloadStream = (content: Blob, fileName: string): void => {
  try {
    let url = window.URL.createObjectURL(content);
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    message.error('导出失败！');
  }
};
// 获取文件地址路径文件名
export const getFileNameByUrl = (url: string) => {
  if (typeof url !== 'string') return;
  let path: string = url.split('?')[0];
  let splitIndex = path.lastIndexOf('/');
  return path.substring(splitIndex + 1);
};
// 获取文件地址路径文件类型
export const getFileTypeByUrl = (url: string) => {
  if (typeof url !== 'string') return;
  let path: string = url.split('?')[0];
  let splitIndex = path.lastIndexOf('.');
  return path.substring(splitIndex + 1);
};
// 获取枚举类型的key数组
export const getEnumKeys = (type) => {
  let keys: string[] = [];
  let arr = Object.entries(type);
  for (let item of arr) {
    typeof item[1] !== 'number' && keys.push(item[0]);
  }
  return keys;
};

// 获取storage中保存的文件地址前缀
export const useFilePrefixUrl = () => {
  const [filePrefixUrl, setFilePrefixUrl] = useState<{
    basePath?: string;
    cndBasePath?: string;
  }>();
  const getFilePath = async () => {
    try {
      const res = await getBasePathApi();
      if ( res) {
        setFilePrefixUrl(res);
        window.sessionStorage.setItem('allBasePath', JSON.stringify(res));
      }
    } catch (err) {}
  };
  useEffect(() => {
    const filePath = JSON.parse(window.sessionStorage.getItem('allBasePath'));
    if (!filePath?.basePath || !filePath?.cdnBasePath) {
      getFilePath();
    } else {
      setFilePrefixUrl(filePath);
    }
  }, []);
  return [filePrefixUrl];
};

// 复制内容到粘贴板
export const copyToClipboard = (text: string): boolean => {
  let flag = false;
  if (typeof text !== 'string') return flag;
  try {
    if (!navigator.clipboard) {
      // 如果浏览器不支持 Clipboard API，则使用 document.execCommand() 方法
      const input = document.createElement('textarea');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    } else {
      // 如果浏览器支持 Clipboard API，则直接调用 writeText() 方法
      navigator.clipboard.writeText(text);
    }
    flag = true;
  } catch (err) {
    flag = false;
  }
  return flag;
};

export const groupByKey = <T extends any>(list: T[], key: string) => {
  let result: Array<T>[] = [] as any;
  let map: Record<string, T[]> = {};
  for (let item of list) {
    let arr = map[item?.[key]] || [];
    arr.push(item);
    map[item?.[key]] = arr;
  }
  result = Object.values(map);
  return result;
};

// 从数组中找到第一个key为指定值的选项
export const getItemByKeyValue = (list: any[], key, value) => {
  let index = list.findIndex((item) => item[key] == value);
  return index > -1 ? list[index] : undefined;
};

/**
 * desc:将分转换成元，默认保留两位小数
 * @param money
 * @return string
 */
export const centCovertYuan = (money?: string | number, fractionDigits = 2) => {
  if (!money) return '0';
  const num = typeof money === 'string' ? parseFloat(money) : money;

  return (num / 100).toFixed(fractionDigits);
};
/*
 * 初始化表单数据
 * @param form
 * @param data
 */
export const initFormValue = <T extends object>(form: FormInstance, data?: T) => {
  if (data && form) {
    let keys = Object.keys(form.getFieldsValue());
    let obj = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (key in data) {
        obj[key] = data[key];
      } else {
        obj[key] = undefined;
      }
    }
    form.setFieldsValue(obj);
  } else if (form && !data) {
    form.resetFields();
  } else {
    // eslint-diable-next-line
    console.error('form or data is not exist!');
  }
};

/**
 * 操作sessionStorage
 *
 */
export const safelySessionStorage = {
  setItem(key: string, value: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {}
  },
  getItem(key: string) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
      return null;
    }
  },
};
/*
 * 去除提交参数中的空格
 * @param params
 */
export function trimSpace(jsonStr) {
  try {
    const params = JSON.parse(jsonStr);
    const recursion = (params) => {
      if (typeof params !== 'object' || typeof params === null) return;
      for (let key in params) {
        if (typeof params[key] === 'string') {
          params[key] = params[key].trim();
        } else if (typeof params[key] === 'object') {
          recursion(params[key]);
        }
      }
    };
    recursion(params);
    return JSON.stringify(params);
  } catch (err) {
    return '{}';
  }
}
/**
 * 转换时长
 * @param duration number 时长
 * @param unit {d:天,h:小时,m:分钟,d：秒} 单位
 * @param format ('d'|'h'|'m'|'s')[] 要显示的单位
 * @returns string
 */
export const formatDuration = (
  duration: number = 0,
  format: ('d' | 'h' | 'm' | 's')[] = ['d', 'h', 'm', 's'],
  unit?: {
    d?: string;
    h?: string;
    m?: string;
    s?: string;
  },
) => {
  const { d = '天', h = '小时', m = '分钟', s = '秒' } = unit || {};
  let remainTime = duration;
  let dCount = 0;
  let hCount = 0;
  let mCount = 0;
  let sCount = 0;
  if (format.includes('d')) {
    dCount = ~~(remainTime / (24 * 60 * 60));
    remainTime -= dCount * (24 * 60 * 60);
  }
  if (format.includes('h')) {
    hCount = ~~(remainTime / (60 * 60));
    remainTime -= hCount * (60 * 60);
  }
  if (format.includes('m')) {
    mCount = ~~(remainTime / 60);
    remainTime -= mCount * 60;
  }
  if (format.includes('s')) {
    sCount = duration % 60;
  }

  const dText = dCount ? dCount + d : '';
  const hText = hCount ? hCount + h : '';
  const mText = mCount ? mCount + m : '';
  const sText = sCount ? sCount + s : '';
  return (
    dText +
    (hText || ((sText || mText) && dText ? '0' + h : '')) +
    (mText || (sText && (dText || hText) ? '0' + m : '')) +
    (sText || (sText || dText || hText ? '' : '0' + s))
  );
};

/**处理手机号  有+号就正常显示 没有就＋86 */
export function handleMobile(mobile: string) {
  if (!mobile) {
    return '-';
  }
  if (mobile.indexOf('+') > -1) {
    return mobile;
  } else {
    return '+86 ' + mobile;
  }
}
/**
 * 判断是否为非NaN数字
 */
export function isTruthNumber(value: string | number) {
  const tempValue = Number(value);
  return isNumber(tempValue) && !isNaN(tempValue) && tempValue == value;
}

/**
 * 判断是否不为null并且不为undefined并且不为空字符串
 */
export const notNulllish = (value: any) => {
  return value !== null && value !== undefined && value !== '';
};

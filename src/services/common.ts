import customFetch from '@/utils/fetch';
import { RequestType } from '../utils/constants';

// 查询省市区
export const getRegionApi = customFetch('partner-basic/region/list');
// 获取文件根路径-返回所有根路径 非CDN:basePath    CDN：cndBasePath
export const getBasePathApi = customFetch('partner-basic/file/getAllBasePath', RequestType.POST);
import axios from '@emp-saas/js/fetch';
// import axios from 'src/utils/fetch'
import Api from './api';
import ServiceType from './type';

export const getUserList = async (params): Promise<ServiceType.UserListResponse> => {
  let result: ServiceType.UserListResponse = await axios.post(Api.getUserList, params);
  if (Array.isArray(result?.data?.dataList)) {
    return result;
  } else {
    return { data: { dataList: [], totalSize: 0 } } as unknown as ServiceType.UserListResponse;
  }
};

import axios from '@emp-saas/js/fetch';
// import axios from 'src/utils/fetch'
import Api from './api';
import ServiceType from "./type";

export const getGoodsList = async (params:ServiceType.GetGoodsListParams) => {
    let result: ServiceType.GetGoodsListResponse = await axios.post(Api.getGoodsList, params);
    return result;
}

// TODO 
const CLOUD_MANAGE_URL = process.env.REACT_APP_CLOUD_MNG_API;
export default {
    getGoodsList: CLOUD_MANAGE_URL + '/goods/list',// 获取商品列表
}
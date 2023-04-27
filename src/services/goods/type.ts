namespace ServiceType {
    export interface BaseResponse {
        message: string;
        code: number;
    }
    export interface GetListBaseParams {
        pageNo: number;
        pageSize: number;
    }
    //商品列表
    export interface GetGoodsListParams extends GetListBaseParams {
        sort?: 0 | 1;
    }
    export interface GetGoodsListResponse extends BaseResponse {
        data: {
            dataList: Goods[];
            totalSize: number;
            pages: number;
        };
    }
    export interface Goods {
        name: string; //商品名
        createTime: string;
        price: string; //商品价格
    }
    //商品列表
}
export default ServiceType;
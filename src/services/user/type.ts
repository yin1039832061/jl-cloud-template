namespace ServiceType {
  export interface BaseResponse {
    message: string;
    code: number;
  }
  //账号列表
  export interface UserListResponse extends BaseResponse {
    data: {
      dataList: User[];
      totalSize: number;
    };
  }
  export interface User {
    account: string; //账号
    createTime: string;
    level: number; //账号等级
    status: string; //账号状态   0禁用，1正常，2未实名
    type: string; //账号类型 0合伙人、1服务商
    userId: number;
    authName: string; //账号名称（手机号）
  }
  //账号列表

}
export default ServiceType;

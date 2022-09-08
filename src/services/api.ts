// TODO 
const CLOUD_MANAGE_URL = process.env.REACT_APP_CLOUD_MNG_API;
const Api = {
  getUserList: CLOUD_MANAGE_URL + '/user/account/userList', //账号列表
};
export default Api;

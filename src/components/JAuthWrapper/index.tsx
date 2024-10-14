import { __NEXT_REDUX_STORE__ } from '@/store/withRedux';
import { connect } from 'react-redux';
import { IState as ICommonState } from '@/reducers/common/type';
import React, { useEffect } from 'react';

interface IProps {
  btnCode: string;
  addtionalProps?: {
    parentPermissions?: string;
    ctx?: any;
  };
  authMap: ICommonState['authMap'];
  menuList: ICommonState['menuList'];
  children?: React.ReactNode;
}
// 根据url获取权限Code
const getPermissionByUrl = (url: string, menuList: ICommonState['menuList']) => {
  let permissionCode: string = '';
  let stack = [...menuList];
  while (stack.length > 0) {
    const item = stack.shift();
    if (item?.component === url) {
      permissionCode = item?.permission;
      // break;
      // 顶部tab会和侧边菜单中的某一个url相同需要继续向下查询，清空当前stack
      stack = [];
    }
    if (Array.isArray(item?.children)) {
      stack = stack.concat(item.children);
    }
  }
  return permissionCode;
};

const getPermissionByFromAuthMap = (
  btnCode,
  authMap: ICommonState['authMap'],
  parentPermissions,
) => {
  // 示例1 service:operate:stock:my/service:operate:stock:my:exportExcel
  // 示例2 service:operate:stock:exportExcel
  let btnCodeArr = btnCode.split('/');
  let list = authMap?.[parentPermissions] || [];
  let result = false;
  while (btnCodeArr.length > 0 && list.length > 0) {
    let code = btnCodeArr.shift();
    let index = list.findIndex((item) => {
      if (item?.permission === code) return true;
      else return false;
    });
    if (index > -1) {
      list = list[index].children || [];
      if (btnCodeArr.length === 0) result = true;
    } else {
      return false;
    }
  }
  return result;
};

const AuthWrapper = (props: IProps) => {
  const { btnCode, addtionalProps, menuList, authMap } = props;
  const [hasAuth, setHasAuth] = React.useState(false);
  useEffect(() => {
    if (menuList && Array.isArray(menuList) && Object.keys(authMap).length > 0) {
      let parentPermissions = addtionalProps?.parentPermissions;
      if (!parentPermissions) {
        let url;
        // 服务端
        if (addtionalProps?.ctx) {
          url = addtionalProps?.ctx?.req?.url;
        } else {
          url = location.pathname;
        }
        parentPermissions = getPermissionByUrl(url, menuList);
      }
      if (!parentPermissions || !authMap?.[parentPermissions]) {
        setHasAuth(false);
        return;
      }
      setHasAuth(getPermissionByFromAuthMap(btnCode, authMap, parentPermissions));
    }
  }, [authMap, menuList, btnCode, addtionalProps]);
  return <>{hasAuth && props.children}</>;
};
export const getAuth = (btnCode: string, addtionalProps?: IProps['addtionalProps']) => {
  const store = window[__NEXT_REDUX_STORE__];
  const authMap = store.getState()?.common?.authMap;
  // 父级权限code
  let parentPermissions = addtionalProps?.parentPermissions;
  // 未指定父级根据当前页面获取父级权限code
  if (!parentPermissions) {
    let url;
    // 服务端
    if (addtionalProps?.ctx) {
      url = addtionalProps?.ctx?.req?.url;
    } else {
      url = location.pathname;
    }
    parentPermissions = getPermissionByUrl(url, store.getState()?.common?.menuList);
  }
  if (!parentPermissions || !authMap?.[parentPermissions]) return false;
  // 根据父级权限获取当前区域/区域下按钮的权限
  return getPermissionByFromAuthMap(btnCode, authMap, parentPermissions);
};
export default connect((state: { common: ICommonState }) => ({
  authMap: state.common?.authMap,
  menuList: state?.common?.menuList,
}))(AuthWrapper);

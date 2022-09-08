import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';

// 处理直接到导出页面在主项目中运行antd组件无法拿到多语言
const localeCom = (Com: React.FunctionComponent, locale?: string): React.FunctionComponent => {
  function WrapComponent(props) {
    return (
      <ConfigProvider locale={zh_CN} prefixCls="ant">
        <Com {...props} />
      </ConfigProvider>
    );
  }
  WrapComponent.displayName = Com.displayName || Com.name || 'LocaleCom';
  return WrapComponent;
};
export default localeCom;

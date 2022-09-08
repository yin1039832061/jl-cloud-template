import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import App from './app';

ReactDOM.createRoot(document.getElementById('emp-root') as HTMLElement).render(
  <ConfigProvider prefixCls="ant" locale={zh_CN}>
    <App />
  </ConfigProvider>,
);

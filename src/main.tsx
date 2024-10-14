import './public-path.js';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';

// 与基座的数据交互
function handleMicroData() {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log('child-cloud getData:', window.microApp.getData());

    // 监听基座下发的数据变化
    window.microApp.addDataListener((data) => {
      console.log('child-cloud addDataListener:', data);
    })

    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({ myname: window.__MICRO_APP_NAME__ });
    }, 3000)
  }
}

const root= createRoot(document.getElementById('root')!);

window.mount = () => {
  root.render(
    <BrowserRouter>
      <ConfigProvider locale={zh_CN}>
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </BrowserRouter>,
  )
  handleMicroData();
}

window.unmount = () => {
  root.unmount();
}
// 如果不在微前端环境，则直接执行mount渲染
// 在微前端环境，会被主应用调用mount函数
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount();
}


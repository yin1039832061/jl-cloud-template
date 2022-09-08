# 合伙云管理后台

## Environment Prepare

Install `node_modules`:

```bash
npm install
```
or
```bash
yarn
```

### 本地环境启动项目

```bash
yarn start
``` 
or 
```base
npm run start
```

### 开发环境打包

```bash
npm run serve
```

### 测试环境打包

```bash
npm run test
```

### 生产环境打包

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test:code
```


## 项目说明

### 技术栈
基于umi3 + dva + antd4 + typescript
[umi3](https://umijs.org/zh-CN/docs)
[dva](https://umijs.org/zh-CN/plugins/plugin-dva)
[antd4](https://ant-design.antgroup.com/components/overview-cn/)

### 项目本地格式化配置

本地添加 vscode 配置文件 .vscode > settings.json 添加如下内容

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 项目目录结构
- assets 静态资源
- components 公共组件
- layouts 布局组件
- models model&model type
- pages 页面
- routes 路由列表
- services 接口
- utils 工具方法
- basicConfig.ts 配置变量
- typings.d.ts 全局类型、自定义方法

import React from 'react';
export const menuRoutes = {
  '/cloudmanage/home': {
    name: '首页',
    path: '/cloudmanage/home',
    component: React.lazy(() => import('src/pages/home'))
  },
  '/cloudmanage/goods/index': {
    name: '商品列表',
    path: '/cloudmanage/goods/index',
    component: React.lazy(() => import('src/pages/goods/index')),
    children: [
      {
        name: '商品详情',
        path: '/cloudmanage/goods/detail',
        component: React.lazy(() => import('src/pages/goods/detail')),
      },
    ],
  },
};
export const otherRoutes = {};

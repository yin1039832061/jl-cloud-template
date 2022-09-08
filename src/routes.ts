import React from 'react';
export const menuRoutes = {
  '/cloudmanage/': {
    name: '首页',
    path: '/cloudmanage/account/index',
    component: React.lazy(() => import('src/pages/home')),
    children: [
      {
        name: '首页',
        path: '/cloudmanage/home',
        component: React.lazy(() => import('src/pages/home')),
      },
    ],
  },
};
export const otherRoutes = {};

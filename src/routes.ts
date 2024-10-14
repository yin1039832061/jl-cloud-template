import {lazy} from 'react';

export default [
    {
        path: '/',
        component: lazy(() => import('./pages/home'))
    },{
        path:'/home',
        component: lazy(() => import('./pages/home'))
    },{
        path:'/test',
        component: lazy(() => import('./pages/test'))
    }
]
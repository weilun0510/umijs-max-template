import { defineConfig } from '@umijs/max';
import { theme } from 'antd';

export default defineConfig({
  antd: {
    dark: true,
    configProvider: {

      theme:{
        algorithm: theme.darkAlgorithm,

        token: {
          defaultBg: "rgb(82, 196, 26)"
        }
      },
    }
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      name: '登录',
      path: '/',
      redirect: './Login',
    },
    // {
    //   path: '/',
    //   redirect: './Home',
    // },
    {
      name: '首页',
      path: '/Home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: 'tets',
      path: '/test',
      component: './Test',
    },
  ],
  npmClient: 'pnpm',
});


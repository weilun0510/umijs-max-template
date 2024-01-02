import { defineConfig } from '@umijs/max';
import { theme } from 'antd';
import routes from './src/routes';

export default defineConfig({
  antd: {
    dark: true,
    configProvider: {
      theme: {
        algorithm: theme.darkAlgorithm,

        token: {
          // defaultBg: "rgb(82, 196, 26)"
        },
        components: {
          Form: {
            /* 这里是你的组件 token */
            itemMarginBottom: 32,
          },
        },
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '魔影2', // 显示在布局左上角的产品名，默认值为包名
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
  styledComponents: {},
  routes,
  npmClient: 'pnpm',
});

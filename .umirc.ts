import { defineConfig } from '@umijs/max';
import customizeTheme from './src/styles/theme';

import routes from './src/routes';

export default defineConfig({
  antd: {
    // dark: true,
    configProvider: {
      theme: customizeTheme,
    },
  },
  access: {},
  initialState: {},
  model: {},
  request: {},
  layout: {
    title: 'XXXXXX', // 显示在布局左上角的产品名，默认值为包名
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
  styledComponents: {},
  routes,
  npmClient: 'pnpm',
  // TODO: 如果没用icons，记得删掉
  icons: {},
  define: {
    API_PREFIX: 'http://localhost:8080', // 开发环境
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8080', // 开发环境
  //     // 这个选项用于控制请求头中的 Origin 字段是否应该被更改为目标 URL。设置为 true 时，Origin 字段会被修改为目标地址，这在某些情况下是必要的，尤其是当后端服务器需要验证请求来源时
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '',
  //     },
  //   },
  // },
  tailwindcss: {},
  // 加速启动和打包：https://makojs.dev/docs/getting-started#bundle-with-umi
  mako: {},
});

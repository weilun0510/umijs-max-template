import { defineConfig } from '@umijs/max';
import pxToViewPort from 'postcss-px-to-viewport';
import customizeTheme from './src/styles/theme';

import routes from './src/routes';

export default defineConfig({
  antd: {
    dark: true,
    configProvider: {
      theme: customizeTheme,
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
  // TODO: 如果没用icons，记得删掉
  icons: {},
  extraPostCSSPlugins: [
    pxToViewPort({
      unitToConvert: 'px',
      viewportWidth: 1920,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/node_modules/],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    }),
  ],
});

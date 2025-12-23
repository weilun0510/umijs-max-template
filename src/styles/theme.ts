import { theme } from 'antd';

export default {
  algorithm: theme.darkAlgorithm,
  token: {
    colorBgLayout: '#fff',
    // colorPrimary: '#6E45E2', // 动态渐变的起点色
    colorLink: '#4D8AF0',
    borderRadius: 6,
    borderRadiusLG: 12,
    borderRadiusSM: 4,
    boxShadow: '0 2px 8px rgba(110,69,226,0.15)',
    boxShadowSecondary: '0 4px 12px rgba(77,138,240,0.25)',
    controlHeight: 36,
    fontFamily: '"Inter", "PingFang SC", system-ui',
  },
  components: {
    /* 这里是你的组件 token */
    Form: {
      itemMarginBottom: 40,
    },
    Tabs: {
      lineWidth: 0,
      lineWidthBold: 0,
    },
    Input: {
      controlHeight: 37,
      controlHeightLG: 46,
    },
    Progress: {
      // colorText: '#2DF7FF',
      // circleTextColor: '#ffffff',
    },
    Button: {
      // colorPrimary:
      //   'linear-gradient(90deg, rgba(45, 247, 255, 0.84) 0%, #365ADD 100%)',
      // colorPrimaryHover:
      //   'linear-gradient(90deg, rgba(45, 247, 255, 0.84) 0%, #365ADD 100%)',
      controlHeightLG: 46,
      controlHeight: 37,
    },
    Card: {
      lineWidth: 0,
      headerFontSize: 24,
      fontWeightStrong: 700,
    },
  },
};

import { theme } from 'antd';

export default {
  algorithm: theme.darkAlgorithm,
  token: {
    // 颜色
    colorPrimary: '#4e8ff3',
    colorInfo: '#4e8ff3',
    colorLink: '#4e8ff3',
    colorTextBase: '#ffffff',
    colorBgBase: '#0a0c10',
    colorSuccess: '#52c41a',
    colorError: '#ff4d4f',
    colorBgContainer: '#1f2336',
    colorBgLayout: '#0a0c10',
    colorText: '#ffffffd9',
    colorTextSecondary: '#989898',
    colorTextTertiary: '#5f5f5f',
    // 尺寸
    fontSize: 16,
    fontSizeSM: 16,
    // 风格
    borderRadius: 2,
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
    Button: {
      colorPrimary:
        'linear-gradient(90deg, rgba(45, 247, 255, 0.84) 0%, #365ADD 100%)',
      colorPrimaryHover:
        'linear-gradient(90deg, rgba(45, 247, 255, 0.84) 0%, #365ADD 100%)',
      controlHeightLG: 46,
      controlHeight: 37,
    },
    Input: {
      controlHeight: 37,
      controlHeightLG: 46,
    },
    Progress: {
      colorText: '#2DF7FF',
      circleTextColor: '#ffffff',
    },
    Card: {
      lineWidth: 0,
    },
  },
};

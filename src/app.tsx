// 运行时配置
import ICON_LOGO from '@/assets/logo.png';
import customizeTheme from '@/styles/theme';
import { RuntimeConfig, createGlobalStyle, history } from '@umijs/max';
import { Dropdown, theme } from 'antd';

import './global.less';

const { getDesignToken } = theme;

// 通过静态方法获取
const globalToken = getDesignToken(customizeTheme);
console.log('globalToken: ', globalToken);

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

// 菜单与布局：https://umijs.org/docs/max/layout-menu#%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE
// ProLayout 高级布局: https://pro-components-preview-pr-4734.surge.sh/components/layout
export const layout: RuntimeConfig['layout'] = () => {
  return {
    logo: ICON_LOGO,
    menu: {
      locale: false,
    },
    rightContentRender: false,
    layout: 'mix',
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      title: '七妮妮',
      render: (props, dom) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  // icon: <LogoutOutlined />,
                  label: '退出登录',
                  onClick: () => history.push('/'),
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },
    // 通过 Token 修改样式
    // https://pro-components-preview-pr-4734.surge.sh/components/layout/#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    token: {
      header: {
        colorBgHeader: globalToken.colorBgContainer,
      },
      sider: {
        colorMenuBackground: globalToken.colorBgContainer,
        // 选中项不持支背景颜色渐变
        // 相关讨论：https://github.com/ant-design/pro-components/discussions/8045
        // colorBgMenuItemSelected: 'rgba(42,100,210,0.35)',
      },
      pageContainer: {
        paddingInlinePageContainerContent: 22,
        paddingBlockPageContainerContent: 22,
        colorBgPageContainer: '#0A0C10',
      },
    },

    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
  };
};

export const styledComponents = {
  GlobalStyle: createGlobalStyle`
    #root {
      width: 100%;
      height: 100%;
      color: ${globalToken.colorTextBase};
      background: ${globalToken.colorBgBase};
    }
  `,
};

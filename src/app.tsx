// 运行时配置
import { RuntimeConfig, createGlobalStyle } from '@umijs/max';
import { Dropdown, theme } from 'antd';

const { getDesignToken } = theme;

// 通过静态方法获取
const globalToken = getDesignToken();
console.log('globalToken: ', globalToken.colorTextBase);

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

// https://umijs.org/docs/max/layout-menu#%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE
export const layout: RuntimeConfig['layout'] = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
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
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
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
      color: #fff;
      background: ${globalToken.colorBgBase};
    }
  `,
};

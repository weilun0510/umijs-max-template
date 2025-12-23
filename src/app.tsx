// 运行时配置
import ICON_LOGO from '@/assets/logo.png';
import customizeTheme from '@/styles/theme';
import FixMenuItemIcon, { MenuDataItem } from '@/utils/fixMenuItemIcon';
import { BellOutlined, SwapOutlined } from '@ant-design/icons';
import { Link, RuntimeConfig, createGlobalStyle } from '@umijs/max';
import { Badge, Dropdown, theme } from 'antd';
import { apiUserInfo } from './api/user';

import './global.less';

const { getDesignToken } = theme;

// 通过静态方法获取
const globalToken = getDesignToken(customizeTheme);

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// https://beta-pro.ant.design/docs/initial-state-cn
// export async function getInitialState(): Promise<LoginVO & PageInfo<Message>> {
// TODO: fix return type
export async function getInitialState(): Promise<any> {
  console.log('getInitialState: ');

  const { data } = await apiUserInfo();

  // const permissionListRes = await apiPermission();

  const _initialState = {
    userInfo: data,
    // permissionList: permissionListRes.data,
  };

  return _initialState;
}

// 菜单与布局：https://umijs.org/docs/max/layout-menu#%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE
// ProLayout 高级布局: https://pro-components-preview-pr-4734.surge.sh/components/layout
// NOTE: ProLayout icon 需要是一个组件类型，而不是 string 类型
export const layout: RuntimeConfig['layout'] = ({ initialState }) => {
  return {
    logo: ICON_LOGO,
    menu: {
      locale: false,
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        account: initialState?.userInfo.username,
      },
      // request: async (params) => {
      //   console.log('params: ', params);
      //   // initialState.currentUser 中包含了所有用户信息
      //   // const { data } = await apiPermission({ account: params.account });
      //   // return data;
      // },
    },
    menuDataRender: (menuData: MenuDataItem[]) => FixMenuItemIcon(menuData),
    layout: 'mix',
    rightContentRender: false,
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      title: initialState?.userInfo.username || 'Coder',
      render: (props, dom) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  label: <Link to={'/'}>退出登录</Link>,
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },
    actionsRender: () => {
      return [
        <Badge count={5} showZero key={'messages'}>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>,
        <Dropdown
          key={'projects'}
          menu={{
            items: [
              {
                key: 'item1',
                label: '项目1',
              },
              {
                key: 'item2',
                label: '项目2',
              },
            ],
            onClick: () => {},
          }}
        >
          <SwapOutlined style={{ fontSize: 20, marginLeft: 20 }} />
        </Dropdown>,
      ];
    },

    // 通过 Token 修改样式
    // https://pro-components-preview-pr-4734.surge.sh/components/layout/#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    token: {
      header: {
        // colorBgHeader: globalToken.colorBgContainer,
      },
      sider: {
        // 选中项不持支背景颜色渐变
        // 相关讨论：https://github.com/ant-design/pro-components/discussions/8045
        // colorBgMenuItemSelected: 'rgba(42,100,210,0.35)',
      },
      pageContainer: {
        paddingInlinePageContainerContent: 22,
        paddingBlockPageContainerContent: 22,
        // colorBgPageContainer: '#0A0C10',
      },
    },

    // 自定义 403 页面（浏览器输入框直接访问时）
    unAccessible: <div>unAccessible</div>,
  };
};

export const styledComponents = {
  GlobalStyle: createGlobalStyle`
    #root {
      width: 100%;
      height: 100%;
      color: ${globalToken.colorTextBase};
      background: ${globalToken.colorBgLayout};
    }
  `,
};

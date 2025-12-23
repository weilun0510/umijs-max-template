// import * as allIcons from '@ant-design/icons';
import React from 'react';

// NOTE: 直接导入 @ant-design/icons 会导致js大小增加2m左右，https://github.com/ant-design/ant-design-pro/issues/8101#issuecomment-820032955
// GOOD: 后期优化时可以使用枚举解决，如下
import {
  AppstoreOutlined,
  CrownOutlined,
  HomeOutlined,
  SmileOutlined,
  SoundOutlined,
  TableOutlined,
} from '@ant-design/icons';

// 利用对象进行图标映射
const iconMapping: any = {
  HomeOutlined: <HomeOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  SmileOutlined: <SmileOutlined />,
  TableOutlined: <TableOutlined />,
  SoundOutlined: <SoundOutlined />,
  CrownOutlined: <CrownOutlined />,
};

export interface MenuDataItem {
  /** @name 子菜单 */
  children?: MenuDataItem[];
  /** @name 在菜单中隐藏子节点 */
  hideChildrenInMenu?: boolean;
  /** @name 在菜单中隐藏自己和子节点 */
  hideInMenu?: boolean;
  /** @name 在面包屑中隐藏 */
  hideInBreadcrumb?: boolean;
  /** @name 菜单的icon,proLayout中需要为React.ReactNode类型 */
  icon?: React.ReactNode | string;
  /** @name 自定义菜单的国际化 key */
  locale?: string | false;
  /** @name 菜单的名字 */
  name?: string;
  /** @name 用于标定选中的值，默认是 path */
  key?: string;
  /** @name disable 菜单选项 */
  disabled?: boolean;
  /** @name 路径,可以设定为网页链接 */
  path?: string;
  /**
   * @deprecated 当此节点被选中的时候也会选中 parentKeys 的节点
   * @name 自定义父节点
   */
  parentKeys?: string[];
  /** @name 隐藏自己，并且将子节点提升到与自己平级 */
  flatMenu?: boolean;
  /** @name 指定外链打开形式，同a标签 */
  target?: string;

  [key: string]: any;
}

// FIX从接口获取菜单时icon为string类型
// 参考：https://github.com/ant-design/ant-design-pro/issues/8860
const FixMenuItemIcon = (menus: MenuDataItem[]): MenuDataItem[] => {
  menus.forEach((item: MenuDataItem) => {
    const { icon, children } = item;
    if (typeof icon === 'string') {
      item.icon = iconMapping[icon];
    }
    if (children && children.length > 0) {
      item.children = FixMenuItemIcon(children);
    }
  });
  return menus;
};
export default FixMenuItemIcon;

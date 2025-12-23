import { InitialState } from '@/api/types';

export default (initialState: InitialState) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  // const { account } = initialState;
  console.log('initialState: ', initialState);
  // const canSeeBase = !!(initialState && account === 'zs');

  // 权限列表
  const auth = ['admin', 'zs'];

  const authObj: { [prop: string]: boolean } = {};
  auth.forEach((key) => {
    authObj[key] = true;
  });

  return authObj;
};

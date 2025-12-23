export default [
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '项目列表',
    path: '/project',
    component: './Project',
    // layout: false,
  },
  // {
  //   name: '项目管理',
  //   path: '/projectManage',
  //   routes: [
  //     {
  //       name: '集数列表',
  //       path: '/projectManage/faceSynthesize',
  //       component: './ProjectManege/FaceSynthesize',
  //     },
  //     {
  //       name: '镜头详情',
  //       path: '/projectManage/faceSynthesize/detail',
  //       component: './ProjectManege/FaceSynthesize/Detail',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: './login',
  },
  {
    name: '登录',
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    name: '无权限',
    path: '/403',
    component: './403',
    layout: false,
  },
  {
    path: '*',
    component: './404',
    layout: false,
  },
];

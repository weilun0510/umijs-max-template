export default [
  {
    name: '首页',
    icon: 'HomeOutlined',
    path: '/home',
    component: './Home',
  },
  {
    name: '镜头抽取',
    icon: 'CameraOutlined',
    path: '/shotExtraction',
    component: './ShotExtraction',
  },
  {
    name: ' 人脸提取',
    icon: 'FacebookOutlined',
    path: '/trainModel',
    // component: './TrainModel',
    routes: [
      {
        name: '人脸提取模型训练',
        path: '/trainModel/ss',
        component: './TrainModel',
      },
    ],
  },
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
    path: '*',
    component: './404',
    layout: false,
  },
  // {
  //   name: 'tets',
  //   path: '/test',
  //   component: './Test',
  // },
];

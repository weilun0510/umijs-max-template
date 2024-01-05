export default [
  {
    name: '首页',
    icon: 'HomeOutlined',
    path: '/home',
    component: './Home',
  },
  {
    name: '人脸提取',
    icon: 'FacebookOutlined',
    path: '/faceExtraction',
    component: './FaceExtraction',
  },
  {
    name: ' 人脸重建',
    icon: 'VideoCameraOutlined',
    path: '/faceRemodeling',
    routes: [
      {
        name: '人脸重建模型训练',
        path: '/faceRemodeling/trainModel',
        component: './FaceRemodeling/TrainModel',
      },
      {
        name: '人脸合成输出',
        path: '/faceRemodeling/faceGeneration',
        component: './FaceRemodeling/FaceGeneration',
      },
    ],
  },
  {
    name: '系统设置',
    icon: 'SettingOutlined',
    path: '/systemSettings',
    component: './SystemSettings',
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

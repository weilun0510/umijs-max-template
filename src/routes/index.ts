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
    path: '/faceExtraction',
    routes: [
      {
        name: '人脸提取模型训练',
        path: '/faceExtraction/trainModel',
        component: './FaceExtraction/TrainModel',
      },
      {
        name: '人脸提取',
        path: '/faceExtraction/faceExtraction',
        component: './FaceExtraction/FaceExtraction',
      },
    ],
  },
  {
    name: ' 人脸重建',
    icon: 'VideoCameraOutlined',
    path: '/faceExtraction',
    routes: [
      {
        name: '人脸重建模型训练',
        path: '/faceExtraction/trainModel',
        component: './FaceExtraction/TrainModel',
      },
      {
        name: '人脸合成输出',
        path: '/faceExtraction/faceExtraction',
        component: './FaceExtraction/FaceExtraction',
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

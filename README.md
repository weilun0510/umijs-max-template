# `@umijs/max` 模板项目

基于 Umi Max + Ant Design Pro Components + Tailwind CSS 的企业级中后台前端解决方案。

更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

## 技术栈

- **框架**: @umijs/max 4.x
- **UI 组件**: Ant Design 5.x + Pro Components
- **样式**: Tailwind CSS
- **状态管理**: Umi Model
- **工具库**: ahooks, lodash, axios

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 代码格式化
npm run format
```

## 构建

```bash
# 测试环境构建
npm run build:test

# 生产环境构建
npm run build:online
```

## 部署

- 测试环境: `./publish.sh` 或 `./publish.sh -e test`
- 生产环境: `./publish.sh -e online`

## 项目注意点

- ProLayout 动态菜单 icon 需要是一个 DOM，而不是 string 类型。解决方案: `utils/fixMenuItemIcon`
- 使用 Tailwind CSS 进行样式开发，避免使用 style 标签
- 图片上传使用 `hooks/useImageUpload` 封装的上传逻辑

## 权限管理

后端权限接口数据格式：

```ts
{
  "id": 0,
  "parentId": 0,
  "keyname": "",
  "level": 0,
  "name": "",
  "path": "",
  "icon": "",
}[]
```

- `name`、`path`、`icon` 用于动态菜单
- `level` 用于处理层级关系
- `keyname` 是权限唯一标识，包括菜单和按钮的权限

## 目录结构

```
src/
├── api/          # API 接口定义
├── components/   # 公共组件
├── hooks/        # 自定义 Hooks
├── pages/        # 页面组件
├── routes/       # 路由配置
├── utils/        # 工具函数
├── constants/    # 常量定义
└── styles/       # 样式配置
```

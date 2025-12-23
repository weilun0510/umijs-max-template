#!/bin/bash

# 默认参数（测试环境）
CMD_SOURCE="npm"
BUILD_CMD="run build:test"  # 默认使用测试环境构建
BUILD_PATH="./dist"
REMOTE_PATH="/www/wwwroot/frontend/umi-max-template/dist"
REMOTE_USER="root"          # 测试环境用户
REMOTE_HOST="8.130.142.163"  # 测试环境主机
REMOTE_PORT="22"         # 测试环境端口

function show_help {
  echo "Usage: publish2.0.sh [options]"
  echo
  echo "Options:"
  echo "  -s, --cmd-source      构建命令来源 (default: 'npm')"
  echo "  -b, --build-cmd       构建命令 (default: 'run build:test')"
  echo "  -p, --build-path      构建产物路径 (default: './dist')"
  echo "  -r, --remote-path     远程服务器目标路径 (default: '/www/wwwroot/frontend/umi-max-template/dist')"
  echo "  -u, --remote-user     远程服务器用户名 (default: 'root')"
  echo "  -h, --remote-host     远程服务器地址 (default: '8.130.142.163')"
  echo "  -P, --remote-port     远程服务器端口 (default: '22')"
  echo "  -e, --env             构建环境 (test/online, default: 'test')"
  echo "  --help                显示帮助信息"
}

# 解析命令行参数
while [[ "$#" -gt 0 ]]; do
  case $1 in
  -b | --build-cmd)
    BUILD_CMD="$2"
    shift
    ;;
  -s | --cmd-source)
    CMD_SOURCE="$2"
    shift
    ;;
  -p | --build-path)
    BUILD_PATH="$2"
    shift
    ;;
  -r | --remote-path)
    REMOTE_PATH="$2"
    shift
    ;;
  -u | --remote-user)
    REMOTE_USER="$2"
    shift
    ;;
  -h | --remote-host)
    REMOTE_HOST="$2"
    shift
    ;;
  -P | --remote-port)
    REMOTE_PORT="$2"
    shift
    ;;
  -e | --env)
    if [[ "$2" == "online" ]]; then
      BUILD_CMD="run build:online"  # 如果指定了 online 环境，使用生产环境构建命令
      REMOTE_USER="root"         # 生产环境用户
      REMOTE_HOST="8.130.142.163" # 生产环境主机
      REMOTE_PORT="22"            # 生产环境端口
    elif [[ "$2" == "test" ]]; then
      BUILD_CMD="run build:test"  # 如果指定了 test 环境，使用测试环境构建命令
      REMOTE_USER="root"          # 测试环境用户
      REMOTE_HOST="8.130.142.163"  # 测试环境主机
      REMOTE_PORT="22"         # 测试环境端口
    else
      echo "Unknown environment: $2"
      show_help
      exit 1
    fi
    shift
    ;;
  --help)
    show_help
    exit 0
    ;;
  *)
    echo "Unknown parameter passed: $1"
    show_help
    exit 1
    ;;
  esac
  shift
done

# 执行构建命令
echo "Running build command: $BUILD_CMD"

"$CMD_SOURCE" $BUILD_CMD
# /mnt/c/Program\ Files/nodejs/npm run build
if [ $? -ne 0 ]; then
  echo "Build failed"
  exit 1
fi

echo "Build success"

# 打包构建产物
PACKAGE_NAME="dist_package.tar.gz"
echo "Packaging build artifacts from $BUILD_PATH"
tar -zcvf $PACKAGE_NAME $BUILD_PATH

# 传输打包文件到远程服务器
echo "Transferring package to remote server $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
scp -P $REMOTE_PORT $PACKAGE_NAME $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

if [ $? -ne 0 ]; then
  echo "Failed to transfer package"
  rm $PACKAGE_NAME
  exit 1
fi

# 连接远程服务器解压文件并清理
echo "Connecting to remote server to extract package"
ssh $REMOTE_USER@$REMOTE_HOST -p $REMOTE_PORT "
cd $REMOTE_PATH &&
find . -type f ! -name $PACKAGE_NAME -exec rm {} +
tar -zxvf $PACKAGE_NAME --strip-components=2 &&
rm $PACKAGE_NAME
"

# 清理本地打包文件
rm $PACKAGE_NAME

echo "Deployment completed successfully"
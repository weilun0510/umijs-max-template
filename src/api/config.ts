// request运行时配置
import { message } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { BusinessCode, ResponseType } from './types';

/**
 * HTTP 状态码：协议层错误
 */
const request = axios.create({
  baseURL: API_PREFIX,
  timeout: 10 * 60 * 1000,
});

/**
 * 请求拦截器：添加 Token
 */
request.interceptors.request.use(
  (config) => {
    const headers = config.headers || {};

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 响应拦截器：分层处理 HTTP 状态码和业务 Code
 */
request.interceptors.response.use(
  (response: AxiosResponse<ResponseType>) => {
    const { code, message: msg } = response.data;

    // 业务成功，直接返回
    if (code === BusinessCode.SUCCESS) {
      return response;
    }

    // 业务逻辑错误处理，显示错误信息
    if (msg) {
      message.error(msg);
    }

    // Token 认证过期/未认证 - 跳转登录页
    if (code === BusinessCode.TOKEN_INVALID) {
      localStorage.removeItem('token');
      setTimeout(() => {
        location.href = '/login';
      }, 1000);
    }

    // 无访问权限：跳转 403 页面
    if (code === BusinessCode.NO_PERMISSION) {
      setTimeout(() => {
        location.href = '/403';
      }, 1000);
    }

    // Promise.reject，可被 request.catch 捕获
    return Promise.reject(response.data);
  },
  (error: AxiosError<ResponseType>) => {
    // HTTP 协议层错误处理
    if (error.code === 'ECONNABORTED') {
      // Toast.error('请求超时，请稍后重试');
      alert('请求超时，请稍后重试');

      return Promise.reject(error);
    }

    // 其他错误
    message.error(error.message || '服务器内部错误');
    return Promise.reject(error);
  },
);

export { request };

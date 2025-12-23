import { request } from './config';
import { ResponseType } from './types';

// 1. 因为Axios[method]的返回类型是AxiosResponse<any, any>,所以我们为示例方法传入返回类型
// 2. Axios[method]直接返回响应数据'return response.data',所以可以在业务代码里直接消费
export async function get<T>(url: string, param: object = {}, options = {}) {
  const response = await request<ResponseType<T>>(url, { params: param, ...options });
  return response.data;
}

export async function post<T>(url: string, param: object = {}, options = {}) {
  const response = await request<ResponseType<T>>(url, {
    method: 'post',
    data: param,
    ...options,
  });
  return response.data;
}

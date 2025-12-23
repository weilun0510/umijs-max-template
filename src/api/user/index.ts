import { get, post } from '../method';
import { LoginVO, UserInfo } from '../types';

export const apiLogin = (params: { username: string; password: string }) => post<LoginVO>('/user/login', params);

export const apiUserInfo = () => get<UserInfo>('/user/info');

export const apiRegister = (params: { username: string; password: string }) => post<UserInfo>('/user/register', params);

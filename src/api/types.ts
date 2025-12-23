import { ASC_ORDER, DESC_ORDER } from '@/constants';

/**
 * 与后端约定的响应数据格式
 * @template T - 业务数据类型
 */
export interface ResponseType<T = any> {
  /** 业务状态码：0-成功，非0-业务逻辑错误 */
  code: BusinessCode;
  /** 业务数据 */
  data: T;
  /** 提示信息 */
  message: string;
}

/**
 * 业务错误码枚举
 */
export enum BusinessCode {
  /** 请求成功 */
  SUCCESS = 0,
  /** Token 无效或已过期 */
  TOKEN_INVALID = 10002,
  /** 无访问权限 */
  NO_PERMISSION = 10201,
}

/**分页请求参数 */
export interface PageParams {
  page?: number;
  pageSize?: number;
}

/**列表信息 */
export interface PageInfo<T> {
  /**当前页 */
  pageNum?: number;
  /**页数 */
  pageSize?: number;
  /**总页数 */
  pages?: number;
  /**总条数 */
  total: number;
  /**列表 */
  records: Array<T>;
}

/** 表示信息的接口 */
export interface LoginVO {
  token: string;
  username: string;
  userId: number;
}

/** 表示用户信息的接口 */
export interface UserInfo {
  id: number;
  username: string;
  avatar: string;
}

export interface InitialState {
  userInfo: UserInfo;
  permissionList: Permission[];
}

/** 排序参数 */
export interface SortParams {
  sortField?: string;
  sortOrder?: typeof ASC_ORDER | typeof DESC_ORDER;
}

/** 表示权限信息的接口 */
export interface Permission {
  /** 权限ID */
  id: number;
  /** 父权限ID */
  parentId: number;
  /** 权限名称 */
  name: string;
  /** 权限关键字 */
  keyname: string;
  /** 权限路径 */
  path: string;
  /** 请求方法 */
  method: string;
  /** 权限层级 */
  level: number;
  /** 权限图标 */
  icon: string;
  /** 是否显示权限 */
  isShow: boolean;
}

/**角色列表参数 */
export type ProjectListDTO = {
  name?: string;
  status?: ProjectStatus;
} & PageParams &
  SortParams;

export enum ProjectStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
/** 项目信息VO */
export interface ProjVO {
  /** 项目id */
  id: number;
  /** 项目名称 */
  name: string;
  /** 项目封面URL */
  cover: string;
  /** 项目状态 */
  status: ProjectStatus;
  /** 项目创建时间（UNIX时间戳，单位：秒） */
  createTime: string;
  /** 项目更新时间（UNIX时间戳，单位：秒） */
  updateTime: string;
}

/** 项目创建参数 */
export interface ProjectCreateParams {
  name: string;
  status: ProjectStatus;
  cover?: string;
}

/**
 * 项目更新参数
 * 继承了项目创建参数，创建参数每个都为可选
 */
export interface ProjectUpdateParams extends Partial<ProjectCreateParams> {
  id: number;
}

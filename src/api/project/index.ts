import { get, post } from '../method';
import { PageInfo, ProjVO, ProjectCreateParams, ProjectListDTO, ProjectUpdateParams } from '../types';

export const apiProjectList = (params: ProjectListDTO) => get<PageInfo<ProjVO>>('/project/list', params);

export const apiProjectDetail = (id: number) => get<ProjVO>(`/project/${id}`);

export const apiProjectCreate = (params: ProjectCreateParams) => post<{ id: number }>('/project/create', params);

export const apiProjectUpdate = (params: ProjectUpdateParams) => {
  const { id, ...rest } = params;
  return post(`/project/update/${id}`, rest);
};

export const apiProjectDelete = (id: number) => post(`/project/delete/${id}`);

export const apiProjectDeleteBatch = (ids: number[]) => post('/project/delete/batch', { ids });

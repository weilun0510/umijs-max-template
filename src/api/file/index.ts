import { post } from '../method';

export const apiFileUpload = (file: FormData) => post<{ url: string }>('/file/upload', file);

export const apiFileBatchUpload = (files: FormData) => post<{ urls: string[] }>('/file/batch-upload', files);

export const apiFileDelete = (fileUrl: string) => post(`/file/delete?fileUrl=${fileUrl}`);


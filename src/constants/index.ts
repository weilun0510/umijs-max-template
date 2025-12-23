import { ProjectStatus } from '@/api/types';

export const DEFAULT_NAME = 'Umi Max';

export const THIS_ITEM_IS_REQUIRED = '该项为必填';
export const THIS_ITEM_IS_REQUIRED_SELECT = '该项为必选';

/**升序 */
export const ASC_ORDER = 'ASC';
/**降序 */
export const DESC_ORDER = 'DESC';

/** 项目状态 */
export const PROJECT_STATUS_OPTIONS = [
  { label: '进行中', value: ProjectStatus.IN_PROGRESS },
  { label: '已完成', value: ProjectStatus.COMPLETED },
];

import debounce from 'lodash/debounce';

/**
 * 检查值是否不在枚举中
 * @param enumObj 枚举对象
 * @param value 要检查的值
 * @returns 如果值不在枚举中返回true，否则返回false
 */
export function isNotInEnum<T extends object>(enumObj: T, value: unknown): boolean {
  // 获取枚举的所有值
  const enumValues = Object.values(enumObj);

  // 检查值是否不在枚举值中
  return !enumValues.includes(value as any);
}

// 创建防抖 onChange
export const handleSearchDebounced = debounce((submit: () => void) => {
  submit();
}, 300);

// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

// 滤掉 HTTP 请求中参数为假值（如 null、undefined、false、空字符串等）的字段
export function filterFalsyParams(params?: Record<string, any>): Record<string, any> {
  const filteredParams: Record<string, any> = {};

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (value !== null && value !== undefined && value !== false && value !== '') {
        filteredParams[key] = value;
      }
    }
  }

  return filteredParams;
}

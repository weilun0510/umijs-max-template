import { apiFileUpload } from '@/api/file';
import { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';

interface UseImageUploadOptions {
  uploadApi?: (formData: FormData) => Promise<{ data: { url: string } }>;
  initialValue?: string;
}

const getFileNameFromUrl = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split('/').pop() || 'file';
  } catch {
    return url.split('/').pop() || 'file';
  }
};

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const { uploadApi = apiFileUpload, initialValue } = options;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (initialValue) {
      setFileList([
        {
          uid: new Date().toString(),
          name: getFileNameFromUrl(initialValue),
          url: initialValue,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [initialValue]);

  const customUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const {
        data: { url },
      } = await uploadApi(formData);
      onSuccess?.({ url }, file);
    } catch (error) {
      onError?.(error);
    }
  };

  const handleImageUpload = (info: any) => setFileList(info.fileList);

  const fieldProps = {
    customRequest: customUpload,
    onChange: handleImageUpload,
    name: 'file',
    listType: 'picture-card' as const,
    fileList,
  };

  return {
    fileList,
    fieldProps,
    setFileList,
  };
}

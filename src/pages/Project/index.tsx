import { apiProjectCreate, apiProjectDelete, apiProjectList, apiProjectUpdate } from '@/api/project';
import { ProjectCreateParams, ProjectListDTO, ProjectStatus, ProjVO } from '@/api/types';
import { ProTable } from '@/components';
import {
  ASC_ORDER,
  DESC_ORDER,
  PROJECT_STATUS_OPTIONS,
  THIS_ITEM_IS_REQUIRED,
  THIS_ITEM_IS_REQUIRED_SELECT,
} from '@/constants';
import { useImageUpload } from '@/hooks';
import { handleSearchDebounced } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  DrawerForm,
  PageContainer,
  ProColumns,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
  QueryFilter,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useAntdTable } from 'ahooks';
import { Button, Form, Image, message, Modal, Space, theme } from 'antd';
import { useRef, useState } from 'react';

const Project: React.FC = () => {
  const filterForm = useRef<ProFormInstance>();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [openAdd, setOpenAdd] = useState(false);
  const [initialCover, setInitialCover] = useState<string>();
  const { fieldProps: imageUploadFieldProps } = useImageUpload({ initialValue: initialCover });

  const { tableProps, search, refresh } = useAntdTable(
    ({ current, pageSize, sorter }) => {
      const formValues = filterForm.current?.getFieldsValue(true) as { status?: ProjectStatus };

      const _params: ProjectListDTO = {
        page: current,
        pageSize,
      };

      if (sorter?.field) {
        _params.sortField = sorter.field;
        _params.sortOrder = sorter.order === 'descend' ? DESC_ORDER : ASC_ORDER;
      }

      return apiProjectList({ ..._params, ...formValues }).then(({ data: { records, total } }) => {
        return {
          list: records,
          total,
        };
      });
    },
    {
      form: filterForm.current,
      defaultPageSize: 10,
    },
  );
  const { reset, submit } = search;

  const handleUpdate = (record: ProjVO) => {
    form.setFieldsValue(record);
    setInitialCover(record.cover);
    setOpenAdd(true);
  };

  /**
   * 确认创建/更新项目
   * @description
   * - 成功：显示成功提示并刷新列表
   * - 失败：错误信息已在拦截器中显示，这里只记录日志
   */
  const onCreateProjectConfirm = async () => {
    try {
      const { createTime, updateTime, ...values } = form.getFieldsValue(true) as ProjVO;
      console.log(values, createTime, updateTime);

      // 处理封面图
      console.log('values', values);

      if (values.cover) {
        if (values.cover.length === 0) {
          // 清除图片
          values.cover = '';
        } else {
          const cover = values.cover[0] as any;
          values.cover = cover.response.url;
        }
      }

      if (values.id) {
        await apiProjectUpdate(values);
        message.success('修改成功');
      } else {
        await apiProjectCreate(values);
        message.success('创建成功');
      }

      refresh();
      setOpenAdd(false);
      setInitialCover(undefined);
      form.resetFields();
    } catch (error) {
      // 错误信息已在拦截器中显示（如权限不足会跳转403页面）
      console.error('操作失败:', error);
    }
  };

  /**
   * 更新项目状态（停止项目）
   * @param record - 项目信息
   */
  const handleUpdateStatus = (record: ProjVO) => {
    Modal.confirm({
      content: '是否确认停止？',
      onOk: async () => {
        try {
          await apiProjectUpdate({ ...record, status: ProjectStatus.COMPLETED });
          message.success('操作成功');
          refresh();
        } catch (error) {
          console.error('停止项目失败:', error);
        }
      },
    });
  };

  /**
   * 删除项目
   * @param record - 项目信息
   */
  const handleDelete = (record: ProjVO) => {
    Modal.confirm({
      content: '是否确认删除？',
      onOk: async () => {
        try {
          await apiProjectDelete(record.id);
          message.success('操作成功');
          refresh();
        } catch (error) {
          console.error('删除项目失败:', error);
        }
      },
    });
  };

  const handleCheck = (record: ProjVO) => {
    localStorage.setItem('project', JSON.stringify(record));
    history.push(`home`);
  };

  const columns: ProColumns<ProjVO>[] = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '项目封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (_, record) =>
        record.cover ? (
          <Image
            src={record.cover}
            width={100}
            height={100}
            style={{ objectFit: 'cover', borderRadius: 4 }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
          />
        ) : (
          '-'
        ),
    },
    {
      title: '项目状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return text === ProjectStatus.COMPLETED ? (
          <span style={{ color: token.colorSuccess }}>已完成</span>
        ) : (
          <span style={{ color: token.colorPrimary }}>进行中</span>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      sorter: true,
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => {
        return (
          <Space>
            <a style={{ color: token.colorPrimary }} onClick={() => handleCheck(record)}>
              查看
            </a>
            <a style={{ color: token.colorPrimary }} onClick={() => handleUpdate(record)}>
              修改
            </a>
            {record.status !== ProjectStatus.COMPLETED && (
              <a style={{ color: token.colorError }} onClick={() => handleUpdateStatus(record)}>
                停止
              </a>
            )}
            <a style={{ color: token.colorError }} onClick={() => handleDelete(record)}>
              删除
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer
      fixedHeader
      loading={{
        // spinning: true,
        className: 'customClassName',
        tip: '拼命加载中...',
      }}
      header={{ title: '项目列表' }}
      subTitle="查看所有项目信息"
    >
      <div className="h-full flex flex-col">
        <QueryFilter<{
          name?: string;
          status?: string;
        }>
          labelWidth={60}
          formRef={filterForm}
          onFinish={submit}
          onReset={reset}
        >
          <ProFormText
            width="md"
            name="name"
            label="项目名称"
            placeholder="请输入项目名称"
            fieldProps={{
              onChange: () => handleSearchDebounced(submit),
              onReset: reset,
            }}
          />
          <ProFormSelect
            width="md"
            name="status"
            label="状态"
            options={PROJECT_STATUS_OPTIONS}
            placeholder="请选择"
            onChange={submit}
            onReset={reset}
          />
        </QueryFilter>

        <ProTable
          columns={columns}
          {...tableProps}
          columnEmptyText="-"
          toolbar={{
            actions: [
              <Button
                type="primary"
                key="add"
                onClick={() => {
                  setInitialCover(undefined);
                  setOpenAdd(true);
                }}
              >
                <PlusOutlined />
                新增项目
              </Button>,
            ],
          }}
        />
      </div>

      <DrawerForm<ProjectCreateParams>
        key="addProject"
        open={openAdd}
        title="新增项目"
        resize={{
          maxWidth: window.innerWidth * 0.8,
          minWidth: 500,
        }}
        autoFocusFirstInput
        drawerProps={{
          destroyOnClose: true,
          maskClosable: true,
          onClose: () => {
            setOpenAdd(false);
            setInitialCover(undefined);
            form.resetFields();
          },
        }}
        submitTimeout={2000}
        form={form}
        onFinish={onCreateProjectConfirm}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: THIS_ITEM_IS_REQUIRED,
            },
          ]}
          name="name"
          label="项目名称"
        />
        <ProFormSelect
          name="status"
          label="状态"
          options={PROJECT_STATUS_OPTIONS}
          rules={[{ required: true, message: THIS_ITEM_IS_REQUIRED_SELECT }]}
          allowClear={false}
        />
        <ProFormUploadButton
          max={1}
          accept="image/*"
          label="上传封面图"
          name="cover"
          fieldProps={imageUploadFieldProps}
        />
      </DrawerForm>
    </PageContainer>
  );
};

export default Project;

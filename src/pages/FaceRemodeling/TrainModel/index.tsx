import type { TabsProps } from 'antd';
import {
  Button,
  Cascader,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tabs,
  theme,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

const TrainModel: React.FC = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [openExtract, setOpenExtract] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全部',
    },
    {
      key: '2',
      label: '已完成',
    },
    {
      key: '3',
      label: '训练中',
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    address2: string;
    tags: string[];
  }

  const checkDetail = (record: any) => {
    console.log('record: ', record);
    setOpen(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '模型ID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '数据集',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '迭代次数',
      dataIndex: 'address2',
      key: 'address2',
    },
    {
      title: '遮罩训练',
      dataIndex: 'address2',
      key: 'address2',
    },
    {
      title: '状态',
      dataIndex: 'address2',
      key: 'address2',
      render: () => {
        return (
          <span style={{ color: token.colorSuccess }}>已完成</span>
          // <span style={{ color: token.colorPrimary }}>已完成</span>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 700,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => setOpenDetail(true)}>
            合成
          </Button>
          <Button type="link" onClick={() => checkDetail(record)} disabled>
            合成
          </Button>

          <Button type="link" style={{ color: token.colorSuccess }}>
            训练
          </Button>
          <Button type="link" danger>
            停止训练
          </Button>

          <Button type="link">详情</Button>

          <Button type="link" danger>
            删除
          </Button>

          <Button type="link" style={{ color: '#CCC744' }}>
            Fork
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      address2: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      address2: 'New York No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      address2: 'New York No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const options = [
    {
      label: '所有镜头',
      value: 'light',
      children: new Array(20).fill(null).map((_, index) => ({
        label: `镜头 ${index}`,
        value: index,
      })),
    },
  ];

  const onChange2 = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <Button type="primary" onClick={() => setOpen(true)}>
          新建模型
        </Button>
      </Flex>
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />

      <Modal
        centered
        title={'模型训练'}
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <Form
          form={form}
          {...layout}
          name="control-hooks"
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item name="note" label="模型名称" rules={[{ required: true }]}>
            <Input placeholder="请输入模型名称" />
          </Form.Item>
          <Form.Item name="num" label="Dest数据集" rules={[{ required: true }]}>
            <Select placeholder="请选择可用的数据集" />
          </Form.Item>
          <Form.Item name="num" label="Src数据集" rules={[{ required: true }]}>
            <Select placeholder="请选择可用的数据集" />
          </Form.Item>
          <Form.Item name="note" label="迭代次数" rules={[{ required: true }]}>
            <InputNumber
              type="number"
              placeholder="请输入迭代次数"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="note"
            label="Batch Size"
            rules={[{ required: true }]}
          >
            <InputNumber
              type="number"
              placeholder="请输入Batch Size"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="note"
            label="自动备份时间(小时)"
            rules={[{ required: true }]}
          >
            <InputNumber
              type="number"
              placeholder="请输入自动备份时间"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item name="num" label="遮罩模型">
            <Select placeholder="请选择遮罩模型" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        centered
        title={'人脸提取任务'}
        open={openExtract}
        onCancel={() => setOpenExtract(false)}
        destroyOnClose
      >
        <Form
          form={form}
          {...layout}
          name="control-hooks"
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item name="note" label="剧集" rules={[{ required: true }]}>
            <Select placeholder="请选择可用的剧集" />
          </Form.Item>
          <Form.Item name="note33" label="镜头" rules={[{ required: true }]}>
            <Cascader
              style={{
                width: '100%',
              }}
              options={options}
              onChange={onChange2}
              multiple
              maxTagCount="responsive"
              placeholder="请选择可用的镜头"
            />
          </Form.Item>
          <Form.Item name="note2" label="人脸模型" rules={[{ required: true }]}>
            <Select placeholder="请选择可用的剧人脸模型" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        centered
        title={'人脸详情'}
        footer={false}
        open={openDetail}
        onCancel={() => setOpenDetail(false)}
      >
        <div>置信度</div>
      </Modal>
    </div>
  );
};

export default TrainModel;

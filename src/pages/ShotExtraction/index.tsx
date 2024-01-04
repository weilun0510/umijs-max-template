import type { TabsProps } from 'antd';
import { Button, Flex, Modal, Progress, Space, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

const ShotExtraction: React.FC = () => {
  const [open, setOpen] = useState(false);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '进行中',
    },
    {
      key: '2',
      label: '已完成',
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
      title: '剧集',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '帧数',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '进度',
      dataIndex: 'address',
      key: 'address',
      render: (text) => (
        <Progress
          percent={text}
          strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
        />
      ),
      // colSpan: 0,
    },
    {
      title: '镜头数',
      dataIndex: 'address2',
      key: 'address2',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 400,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => checkDetail(record)}>
            查看详情
          </Button>
          <a>数据导出</a>
          <Button type="link" danger>
            停止
          </Button>
          <Button type="link" danger>
            删除
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

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <Button type="primary">添加任务</Button>
      </Flex>
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />

      <Modal
        title={false}
        footer={false}
        open={open}
        onCancel={() => setOpen(false)}
      >
        A
      </Modal>
    </div>
  );
};

export default ShotExtraction;

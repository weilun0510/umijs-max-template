import type { TabsProps } from 'antd';
import { Button, Flex, Space, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const ShotExtraction: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
    },
    {
      key: '2',
      label: 'Tab 2',
    },
    {
      key: '3',
      label: 'Tab 3',
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
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
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
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
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
    </div>
  );
};

export default ShotExtraction;

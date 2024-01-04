import { PageContainer } from '@ant-design/pro-components';
import { Form, Input, theme } from 'antd';

const { useToken } = theme;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const HomePage: React.FC = () => {
  const { token } = useToken();
  console.log('token: ', token);

  return (
    <PageContainer>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>项目工作目录</div>
        <Form.Item<FieldType>
          label="项目工作目录"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <div>人脸提取</div>
        <Form.Item<FieldType>
          label="模型目录"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="数据集目录"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <div>人脸重建</div>
        <Form.Item<FieldType>
          label="模型目录"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Src数据集目录"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="遮罩模型目录"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default HomePage;

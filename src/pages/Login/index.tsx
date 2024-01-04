import { history } from '@umijs/max';
import { Button, Col, Flex, Form, Input, theme } from 'antd';

import s from './index.less';

const { useToken } = theme;

const Login: React.FC = () => {
  const { token } = useToken();
  console.log('token: ', token);
  const [form] = Form.useForm();

  const onFinish = async () => {
    history.push('/home');
  };

  // NOTICE: 放弃less 做主题
  // https://github.com/ant-design/ant-design/discussions/46449
  // const style = {
  //   width: 20,
  //   height: 30,
  //   backgroundColor: token.defaultBg,
  // };

  return (
    <Flex align="center" className={s.login}>
      <Col span={7} offset={4}>
        <div className={s.name}>AI人脸重建操作系统</div>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" size="large" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input type="password" placeholder="请输入密码" size="large" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 8 }}>
            <Button type="primary" block htmlType="submit" size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Flex>
  );
};

export default Login;

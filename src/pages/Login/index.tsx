import { history, useModel } from '@umijs/max';
import { Button, Col, Flex, Form, Input, message } from 'antd';

import { apiLogin } from '@/api/user';

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm();

  /**
   * 登录表单提交处理
   * @param values - 表单数据（用户名、密码）
   */
  const onFinish = async (values: any) => {
    try {
      // 调用登录接口
      const { data } = await apiLogin(values);

      // const permissionListRes = await apiPermission();

      // 设置全局状态
      const _initialState = {
        userInfo: data,
        // permissionList: permissionListRes.data,
      };

      setInitialState(_initialState);

      // 保存 Token
      localStorage.setItem('token', data.token);

      message.success('登录成功');
      history.push('/project');
    } catch (error: any) {
      // 登录失败（业务 Code = 10101）
      // 错误信息已在拦截器中显示，这里只需记录日志
      console.error('登录失败:', error);

      // 可选：清空密码输入框
      form.setFieldValue('password', '');
    }
  };

  return (
    <div
      className="size-full flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)' }}
    >
      <Flex align="center" className="flex items-center justify-center bg-[#fff] md:w-[560px] rounded-lg">
        <Col md={12} span={12}>
          <div className="mt-8 text-center">
            <h1 className="text-3xl font-bold text-gray-600">xxxxxxxxxxxxxxxx</h1>
            <p className="text-lg text-gray-600 mt-2">管理后台</p>
          </div>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="请输入用户名" size="large" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input type="password" placeholder="请输入密码" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" size="large" className="mt-4">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Flex>
    </div>
  );
};

export default Login;

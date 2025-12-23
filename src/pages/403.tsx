import { history } from '@umijs/max';
import { Button, Result } from 'antd';

/**
 * 403 无权限页面
 */
function Page403() {
  const toHome = () => history.push('/');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您没有访问此页面的权限"
        extra={
          <Button type="primary" onClick={toHome}>
            返回首页
          </Button>
        }
      />
    </div>
  );
}

export default Page403;


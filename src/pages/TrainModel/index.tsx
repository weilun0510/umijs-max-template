import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';

const { useToken } = theme;

const HomePage: React.FC = () => {
  const { token } = useToken();
  console.log('token: ', token);

  // NOTICE: 放弃less 做主题
  // https://github.com/ant-design/ant-design/discussions/46449
  const style = {
    width: 20,
    height: 30,
    // backgroundColor: token.defaultBg,
  };

  return (
    <PageContainer ghost>
      <h1>test</h1>
      <div style={style}>11111111111</div>
    </PageContainer>
  );
};

export default HomePage;

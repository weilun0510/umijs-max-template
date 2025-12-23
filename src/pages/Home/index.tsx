import Guide from '@/components/Guide';
import { useModel } from '@umijs/max';

const HomePage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  console.log('home initialState: ', initialState);

  return <Guide name="Umi Max" />;
};

export default HomePage;

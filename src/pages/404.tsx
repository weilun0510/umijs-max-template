import IMG_404 from '@/assets/404.png';
import { history } from '@umijs/max';
import { Button } from 'antd';

import styles from './404.less';

function Page404() {
  const toLogin = () => history.push('/');

  return (
    <div className={styles.page404}>
      <img className={styles.img} src={IMG_404} alt="404" />
      <div className={styles.text}>页面不存在</div>
      <Button type="primary" onClick={toLogin}>
        返回登录页
      </Button>
    </div>
  );
}

export default Page404;

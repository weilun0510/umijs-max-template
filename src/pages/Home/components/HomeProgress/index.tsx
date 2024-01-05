import { Progress } from 'antd';
import s from './index.less';

const percent = 76;
const HomeProgress: React.FC = () => {
  return (
    <div className={s.progressWrap}>
      <Progress
        percent={percent}
        type="circle"
        strokeWidth={5}
        strokeColor={{ '0%': '#175CE1', '100%': '#17CDD4' }}
        format={() => null}
      />
      <Progress
        percent={percent}
        type="circle"
        strokeWidth={2}
        strokeColor={{ '0%': '#175CE1', '100%': '#17CDD4' }}
        trailColor={'transparent'}
        format={(percent) => (
          <div style={{ fontWeight: 'bold' }}>
            <div style={{ fontSize: 36 }}>{percent}%</div>
            <div style={{ fontSize: 20, marginTop: 10 }}>CPU(256C)</div>
          </div>
        )}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
        }}
      />
    </div>
  );
};
export default HomeProgress;

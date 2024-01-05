import ICON_HEXAGON from '@/assets/home/hexagon.png';
import IMG_1 from '@/assets/home/image1.png';
import { useModel } from '@umijs/max';
import { Card, Col, Flex, Progress, Row, Space, theme } from 'antd';
import React from 'react';

import HomeProgress from './components/HomeProgress';

const { useToken } = theme;

const HomePage: React.FC = () => {
  const { token } = useToken();
  const { name } = useModel('global');
  console.log('name: ', name);

  const GUTTER = 28;

  return (
    <Row gutter={[0, GUTTER]}>
      <Card title="系统负载" headStyle={{ fontSize: 24, fontWeight: 700 }}>
        <Row>
          <Row align={'middle'} gutter={[0, GUTTER]}>
            <Col xxl={13} xl={24} lg={24}>
              <Row gutter={[GUTTER, GUTTER]} align={'middle'}>
                {[50, 70, 33].map((x) => (
                  <Col key={x} xxl={8} xl={8} lg={8}>
                    <Card style={{ backgroundColor: '#2A2A4A' }}>
                      <HomeProgress />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xxl={11} xl={24} lg={24}>
              <Row gutter={[GUTTER, GUTTER]} justify={'space-between'}>
                {[1, 1, 2, 3].map((x) => (
                  <Col xl={12} lg={12} md={12} key={x}>
                    <Flex
                      justify="space-between"
                      vertical
                      style={{
                        height: 120,
                        backgroundSize: '100% auto',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${IMG_1})`,
                        borderRadius: 8,
                        padding: '18px 24px',
                      }}
                    >
                      <div>CPU 核心数</div>
                      <div>256核</div>
                    </Flex>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Row>
      </Card>

      <Row>
        <Col span={8}>
          <Row gutter={[0, GUTTER]}>
            <Card
              title="人脸提取"
              headStyle={{ fontSize: 24, fontWeight: 700 }}
            >
              <Row gutter={[0, GUTTER / 2]}>
                {[33, 44, 55].map((x, index) => (
                  <Col span={24} key={x}>
                    <Space>
                      <Flex
                        align="center"
                        justify="center"
                        style={{
                          fontSize: 12,
                          backgroundImage: `url(${ICON_HEXAGON})`,
                          backgroundSize: '100%, 100%',
                          width: 25,
                          height: 25,
                        }}
                      >
                        {index + 1}
                      </Flex>
                      {`EP-00${index + 1}`}
                    </Space>
                    <Flex
                      align="center"
                      style={{
                        height: 30,
                        padding: '0 5px',
                        background: 'rgba(57, 98, 151, 0.15)',
                      }}
                    >
                      <Progress
                        percent={x}
                        status="active"
                        strokeColor={{
                          '0%': 'rgba(45,247,255,0)',
                          '100%': '#2DF7FF',
                        }}
                      />
                    </Flex>
                  </Col>
                ))}
              </Row>
            </Card>

            <Card
              title="人脸提取模型"
              headStyle={{ fontSize: 24, fontWeight: 700 }}
            >
              <Row>
                <Col span={24}>
                  <Space size="large">
                    <span>范冰冰</span>
                    <span>
                      [12:00:00] | [210334] |{' '}
                      <span style={{ color: token.colorSuccess }}>
                        [0.00125]
                      </span>
                    </span>
                  </Space>
                  <Space size="large" style={{ marginTop: token.marginLG }}>
                    <span>范冰冰</span>
                    <span>
                      [12:00:00] | [210334] |{' '}
                      <span style={{ color: token.colorPrimary }}>
                        [0.00125]
                      </span>
                    </span>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Row>
        </Col>

        <Col span={16}>
          <Card
            title="人脸重建系统"
            headStyle={{ fontSize: 24, fontWeight: 700 }}
            style={{
              height: '100%',
              marginLeft: GUTTER,
              width: `calc(100% - ${GUTTER}px)`,
            }}
          >
            <Space size="large">
              <span>范冰冰</span>
              <span>佟丽娅</span>
              <span>
                [12:00:00] | [210334] |{' '}
                <span style={{ color: token.colorSuccess }}>[0.00125]</span> |{' '}
                <span style={{ color: token.colorSuccess }}>[0.00125]</span>
              </span>
            </Space>

            <div style={{ marginTop: token.marginLG }}>
              <img
                src={IMG_1}
                style={{ width: '100%', maxHeight: 300 }}
                alt=""
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Row>
  );
};

export default HomePage;

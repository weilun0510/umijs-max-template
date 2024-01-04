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

  const cardStyle: React.CSSProperties = {
    height: 139,
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${IMG_1})`,
    borderRadius: 8,
    padding: '18px 24px',
  };

  const renderSectionTitle = (title: string) => (
    <div style={{ fontSize: 24, fontWeight: '700' }}>{title}</div>
  );

  return (
    <Row gutter={[0, 28]}>
      <Card>
        <Row>{renderSectionTitle('系统负载')}</Row>
        <Row gutter={50} align={'middle'} style={{ width: '100%' }}>
          <Col xxl={13} xl={13} lg={24}>
            <Row gutter={[28, 28]} align={'middle'}>
              {[50, 70, 33].map((x) => (
                <Col key={x} xxl={8} xl={8} lg={12}>
                  <HomeProgress />
                </Col>
              ))}
            </Row>
          </Col>
          <Col xxl={11} xl={11} lg={24}>
            <Row
              gutter={[
                { xxl: 28, xl: 28, lg: 20 },
                { xxl: 28, xl: 28, lg: 20 },
              ]}
            >
              <Col span={12}>
                <Flex justify="space-between" vertical style={{ ...cardStyle }}>
                  <div>CPU 核心数</div>
                  <div>256核</div>
                </Flex>
              </Col>
              <Col span={12}>
                <Flex justify="space-between" vertical style={{ ...cardStyle }}>
                  <div>CPU 核心数</div>
                  <div>256核</div>
                </Flex>
              </Col>
              <Col span={12}>
                <Flex justify="space-between" vertical style={{ ...cardStyle }}>
                  <div>CPU 核心数</div>
                  <div>256核</div>
                </Flex>
              </Col>
              <Col span={12}>
                <Flex justify="space-between" vertical style={{ ...cardStyle }}>
                  <div>CPU 核心数</div>
                  <div>256核</div>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* TODO: gutter */}
      <Row gutter={28} justify={'space-between'}>
        <Col span={8}>
          <Row gutter={[0, 28]}>
            <Card>
              <Row>{renderSectionTitle('人脸提取')}</Row>
              <Row>
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

            <Card>
              <Row>{renderSectionTitle('人脸提取模型')}</Row>
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
                  <Space size="large">
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
          <Card>
            <Row>{renderSectionTitle('人脸重建系统')}</Row>
          </Card>
        </Col>
      </Row>
    </Row>
  );
};

export default HomePage;

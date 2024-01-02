import IMG_1 from '@/assets/home/image1.png';
import { useModel } from '@umijs/max';
import { Col, Flex, Row, theme } from 'antd';
import React from 'react';

import s from './index.less';

const { useToken } = theme;

const HomePage: React.FC = () => {
  const { token } = useToken();
  const { name } = useModel('global');
  console.log('name: ', name);

  const cardStyle: React.CSSProperties = {
    width: '45%',
    height: 139,
  };

  // const fillStyle: React.CSSProperties = {
  //   width: '100%',
  //   height: '100%',
  //   background: 'red',
  // };

  const renderSectionTitle = (title: string) => (
    <div style={{ fontSize: token.fontSize }}>{title}</div>
  );

  return (
    <div>
      <div>
        {renderSectionTitle('系统负载')}
        <Row gutter={[28, 28]}>
          <Col span={14}>1</Col>
          <Col span={9}>
            <Flex wrap="wrap" gap="small">
              <Flex justify="space-between" style={{ ...cardStyle }}>
                <Flex justify="space-between" vertical>
                  <div>CPU 核心数</div>
                  <div>256核</div>
                </Flex>
                <img className={s.cardImg} src={IMG_1} alt="IMG_1" />
              </Flex>
              <Flex justify="space-between" style={{ ...cardStyle }}>
                <Flex justify="space-between" vertical>
                  <div>CPU 核心数</div>
                  <div>256核</div>
                </Flex>
                <img className={s.cardImg} src={IMG_1} alt="IMG_1" />
              </Flex>
              <Flex justify="space-between" style={{ ...cardStyle }}>
                <Flex justify="space-between" vertical>
                  <div>CPU 核心数</div>
                  <div>256核</div>
                </Flex>
                <img className={s.cardImg} src={IMG_1} alt="IMG_1" />
              </Flex>
              <Flex justify="space-between" style={{ ...cardStyle }}>
                <Flex justify="space-between" vertical>
                  <div>CPU 核心数</div>
                  <div>256核</div>
                </Flex>
                <img className={s.cardImg} src={IMG_1} alt="IMG_1" />
              </Flex>
            </Flex>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[28, 28]}>
          <Col span={8}>
            <Row gutter={[28, 28]}>
              <Col span={12}>镜头提取</Col>
              <Col span={12}>人脸提取</Col>
            </Row>
            <Row>人脸提取模型</Row>
          </Col>
          <Col span={16}>{renderSectionTitle('人脸重建系统')}</Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;

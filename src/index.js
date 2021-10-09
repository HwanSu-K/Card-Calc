import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Row, Col, Typography } from 'antd'
const { Title } = Typography;
ReactDOM.render(
  <React.StrictMode>
    <Title level={2} style={{margin:30, textAlign:'center'}}>얼마나 써야 되는거야?</Title>
    <Row>
      <Col span={12} style={{margin:'0 auto'}}>
        <App />
      </Col>
    </Row>
    <Title level={5} style={{margin:30, textAlign:'center', color:'red'}}>*실제 금액과 차이가 있을 수 있습니다.*</Title>l
  </React.StrictMode>,
  document.getElementById('root')
);

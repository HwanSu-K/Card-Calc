import React, { useState } from 'react';
import { Form, Input, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Text } = Typography;

const num2han = (num) => {
  num = parseInt((num + '').replace(/[^0-9]/g, ''), 10) + ''; // 숫자/문자/돈 을 숫자만 있는 문자열로 변환
  if (num === '0') return '영';
  var number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  var unit = ['', '만', '억', '조'];
  var smallUnit = ['천', '백', '십', ''];
  var result = []; //변환된 값을 저장할 배열
  var unitCnt = Math.ceil(num.length / 4); //단위 갯수. 숫자 10000은 일단위와 만단위 2개이다.
  num = num.padStart(unitCnt * 4, '0'); //4자리 값이 되도록 0을 채운다
  var regexp = /[\w\W]{4}/g; //4자리 단위로 숫자 분리
  var array = num.match(regexp);
  //낮은 자릿수에서 높은 자릿수 순으로 값을 만든다(그래야 자릿수 계산이 편하다)
  for (var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
    var hanValue = _makeHan(array[i]); //한글로 변환된 숫자
    if (hanValue === '')
      //값이 없을땐 해당 단위의 값이 모두 0이란 뜻.
      continue;
    result.unshift(hanValue + unit[unitCnt]); //unshift는 항상 배열의 앞에 넣는다.
  }
  //여기로 들어오는 값은 무조건 네자리이다. 1234 -> 일천이백삼십사
  function _makeHan(text) {
    var str = '';
    for (var i = 0; i < text.length; i++) {
      var num = text[i];
      if (num === '0')
        //0은 읽지 않는다
        continue;
      str += number[num] + smallUnit[i];
    }
    return str;
  }
  return result.join('');
};

const App = () => {
  const [useQuarterlyMoney, setUseQuarterlyMoney] = useState();
  const [useQuarterlyMoneyKr, setUseQuarterlyMoneyKr] = useState('');
  const [useMoney, setUseMoney] = useState();
  const [useMoneyKr, setUseMoneyKr] = useState('');
  const [useGetMoney, setuseGetMoney] = useState();
  const [useGetMoneyKr, setuseGetMoneyKr] = useState('');
  const [maxGetMoney, setMaxGetMoney] = useState();
  const [maxGetMoneyKr, setMaxGetMoneyKr] = useState('');

  const calcGetMoney = (_useMoney, _useQuarterlyMoney) => {
    const calcGetMoney = (_useMoney - (_useQuarterlyMoney * 1.03).toFixed(0)) * 0.1;
    if(calcGetMoney > 0) {
      if(calcGetMoney > 100_000) {
        setuseGetMoney(100_000);
        setuseGetMoneyKr(100_000);
      } else {
        setuseGetMoney(calcGetMoney);
        setuseGetMoneyKr(calcGetMoney);
      }
    } else {
      setuseGetMoney(0);
      setuseGetMoneyKr('');
    }
  }
  const onChangeUseMoney = (e) => {
    setUseMoney(e.currentTarget.value);
    setUseMoneyKr(num2han(e.currentTarget.value));
    calcGetMoney(e.currentTarget.value, useQuarterlyMoney);
  };

  const onChangeUseQuarterlyMoney = (e) => {
    setUseQuarterlyMoney(e.currentTarget.value);
    setUseQuarterlyMoneyKr(num2han(e.currentTarget.value));
    calcGetMoney(useMoney, e.currentTarget.value);
    if (e.currentTarget.value > 0) {
      const calcMaxMoney = (e.currentTarget.value * 1.03 + 1_000_000).toFixed(0);
      setMaxGetMoney(calcMaxMoney);
      setMaxGetMoneyKr(num2han(calcMaxMoney));
    } else {
      setMaxGetMoney();
      setMaxGetMoneyKr(num2han(0));
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="2분기 사용금액"
        >
          <Input
            prefix="₩"
            type="number"
            value={useQuarterlyMoney}
            onChange={onChangeUseQuarterlyMoney}
          />
          <Text style={{ color: 'gray', marginLeft: 15 }}>
            {useQuarterlyMoney > 0 ? `${useQuarterlyMoneyKr}원` : '원'}
          </Text>
        </Form.Item>
        <Form.Item
          label="현재 사용금액"
        >
          <Input
            prefix="₩"
            type="number"
            value={useMoney}
            onChange={onChangeUseMoney}
          />
          <Text style={{ color: 'gray', marginLeft: 15 }}>
            {useMoney > 0 ? `${useMoneyKr}원` : '원'}
          </Text>
        </Form.Item>
        <Form.Item
          label="수령 가능금액"
        >
          <Input
            prefix="₩"
            type="number"
            disabled={true}
            value={useGetMoney}
          />
          <Text style={{ color: 'gray', marginLeft: 15 }}>
            {useGetMoney > 0 ? `${useGetMoneyKr}원` : '원'}
          </Text>
        </Form.Item>
        <Form.Item
          label="지원금 최대 수령 가능금액"
        >
          <Input
            prefix="₩"
            type="number"
            disabled={true}
            value={maxGetMoney}
          />
          <Text style={{ color: 'gray', marginLeft: 15 }}>
            {maxGetMoney > 0 ? `${maxGetMoneyKr}원` : '원'}
          </Text>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;

import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from '@/component/styles';
import {
  Box,
  Button,
  CountdownTimer,
  Footer,
  Title,
} from '@/component/Component';

export function ConfirmOTP(): JSX.Element {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputs = useRef<TextInput[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value.length > 0 && index < 6) {
      inputs.current[index + 1]?.focus();
    }
  };
  const handleFocus = (index: number) => {
    if (otp.every((character) => character === '')) {
      inputs.current[0]?.focus();
    }
  };
  const handleBackspace = (index: number) => {
    if (otp[index] === '') {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length === 6) {
      console.log('OTP:', enteredOTP);
    } else {
      console.log('Vui lòng nhập đủ 6 ký tự');
    }
  };
  const handleReset = () => {
    setOtp(Array(6).fill(''));
    inputs.current.forEach((input) => input?.clear());
    inputs.current[0].focus();
  };

  return (
    <View style={styles.container}>
      <Title title=""></Title>

      <View style={styles.body}>
        <Text style={{ fontSize: 30, color: '#FCC435' }}>Confirm OTP code</Text>
        <Text style={{ fontSize: 15, color: '#FFFFFF' }}>
          You just need to enter the OTP sent to the registered phone number
          (704) 555-0127.{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between',
            marginTop: 48,
          }}
        >
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref as TextInput)}
              style={{
                borderWidth: 2,
                borderColor: '#FCC435',
                backgroundColor: '#271D08',
                padding: 10,
                marginRight: 10,
                width: 52,
                height: 72,
                textAlign: 'center',
                color: '#F2F2F2',
                borderRadius: 8,
                fontSize: 32,
                fontWeight: '700',
              }}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(index, text)}
              onFocus={() => handleFocus(index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>
        <CountdownTimer
          durationInSeconds={3}
          onPress={handleReset}
        ></CountdownTimer>
      </View>
      <View>
        <Button title="Continue" onPress={handleSubmit}></Button>
        <View style={{ marginTop: 16 }} />
      </View>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
}

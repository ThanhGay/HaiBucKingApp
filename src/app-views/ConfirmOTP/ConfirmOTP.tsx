import React, { useRef, useState } from 'react';
import { View, Text, StatusBar, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { Button, CountdownTimer, Title } from '@/component/Component';
import { styles } from '@/component/styles';
import { apiResetPassword } from '@/api/auth';
import { resetPassword } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface ConfirmOtpProps {
  route: any;
}

const ConfirmOTP: React.FC<
  ConfirmOtpProps & { navigation: NavigationProp<any> }
> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const phoneNumber = route.params.phoneNumber;
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputs = useRef<TextInput[]>(Array(6).fill(null));

   const { isResetPassWord } = useAppSelector(
     (state) => state.authState,
   );
  const dispatch = useAppDispatch()

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
    if (otp.every((character) => !character)) {
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
      if (route.params.continue === 'FirstScreen') {
        submit(route.params);
      } else {
        navigation.navigate(route.params.continue, route.params);
      }
    } else {
      console.log('Vui lòng nhập đủ 6 ký tự');
    }
  };
  const handleReset = () => {
    setOtp(Array(6).fill(''));
    inputs.current.forEach((input) => input?.clear());
    inputs.current[0].focus();
  };

  const submit = async (values: any) => {
    const dataRes = await apiResetPassword(values);
    dispatch(
      resetPassword({
        phoneNumber: values.phoneNumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
    );
    if (!isResetPassWord) {
      console.log('Success');
      navigation.navigate(route.params.continue);
    } else {
      console.log('Failure');
    }
  };

  return (
    <View style={styles.container}>
      <Title leftIcon title="" onPressLeft={() => navigation.goBack()} />

      <View style={styles.body}>
        <Text style={{ fontSize: 30, color: '#FCC435' }}>
          {t('confirm-otp.title', 'Confirm OTP code')}
        </Text>
        <Text style={{ fontSize: 15, color: '#FFFFFF' }}>
          {t(
            'confirm-otp.message',
            'You just need to enter the OTP sent to the registered phone number ',
          )}
          {phoneNumber}
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
        <CountdownTimer durationInSeconds={5} onPress={handleReset} />
      </View>
      <View>
        <Button
          title={t('buttons.continue', 'Continue')}
          onPress={handleSubmit}
          disable={isResetPassWord}
        />
        <View style={{ marginTop: 16 }} />
      </View>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
};

export default ConfirmOTP;

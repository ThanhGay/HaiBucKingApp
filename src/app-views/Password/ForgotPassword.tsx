import React, { useState } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';

const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
  'gm',
);

const ForgotPassword: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSummit = () => {
    if (!(phoneNumber.length === 10)) {
      setErrorMessage('Your phone number must be 10 digit');
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        t(
          'messages.error.password',
          'Your new password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
        ),
      );
      return;
    }

    if (password !== confirm) {
      setErrorMessage(
        t(
          'messages.error.confirm-password',
          'Your password and confirm password do not match',
        ),
      );
      return;
    }
    setErrorMessage('');
    navigation.navigate('ConfirmOTP', {
      phoneNumber,
      password,
      confirmPassword: confirm,
      continue: 'FirstScreen',
    });
  };

  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title={t('reset-password.title', 'Reset password')}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/phone.png')}
          title={t('reset-password.phone', 'Phone number')}
          onChangeText={(text: string) => {
            setPhoneNumber(text);
          }}
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={t('reset-password.new-password', 'New password')}
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={t('reset-password.confirm-password', 'Confirm new password')}
          onChangeText={(text: string) => {
            setConfirm(text);
          }}
          secureTextEntry
        />
        <View>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>
      </View>
      <Button
        title={t('buttons.continue', 'Continue')}
        onPress={handleSummit}
      />
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ paddingTop: 20 }} />
    </View>
  );
};

export default ForgotPassword;

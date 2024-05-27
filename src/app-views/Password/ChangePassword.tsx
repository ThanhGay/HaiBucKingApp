import React, { useState } from 'react';
import { View, StatusBar, Alert, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDataUser } from '@/redux/features/authSlice';
import { apiChangePassword } from '@/api/auth';

const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
  'gm',
);

const ChangePassword: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { user, token } = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async () => {
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        t(
          'messages.error.password',
          'Your new password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
        ),
      );
      return;
    }

    if (newPassword !== confirm) {
      setErrorMessage(
        t(
          'messages.error.confirm-password',
          'Your password and confirm password do not match',
        ),
      );
      return;
    }

    if (password === user.PassWord) {
      const dataRes = await apiChangePassword({
        password: password,
        newPassword: newPassword,
        token,
      });

      if (dataRes.status) {
        (() =>
          Alert.alert(
            'Notice',
            t('messages.success.update.password', 'Your password is updated!'),
          ))();
        dispatch(setDataUser({ ...user, PassWord: newPassword }));
        navigation.goBack();
      } else {
        setErrorMessage(
          t(
            'messages.error.duplicate-password',
            'The new password and current password match',
          ),
        );
      }
    } else {
      setErrorMessage(
        t('messages.error.wrong-password', 'Your password is incorrect'),
      );
    }
  };

  // use redux
  // const handleSubmit = () => {
  //   setErrorMessage('');

  //   if (passwordRegex.test(newPassword)) {
  //     setErrorMessage(
  //       'Your new password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  //     );
  //     return;
  //   }

  //   if (newPassword !== confirm) {
  //     setErrorMessage('Your password and confirm password do not match');
  //     return;
  //   }

  //   dispatch(authChangePassword({ password, newPassword, token }));
  // };

  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title={t('change-password.title', 'Change Password')}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={t('change-password.your-password', 'Your password')}
          onChangeText={(text: string) => {
            setPassword(text);
            setErrorMessage('');
          }}
          onFocus={() => setErrorMessage('')}
          secureTextEntry
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={t('change-password.new-password', 'New password')}
          onChangeText={(text: string) => {
            setNewPassword(text);
            setErrorMessage('');
          }}
          onFocus={() => setErrorMessage('')}
          secureTextEntry
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={t('change-password.confirm-password', 'Confirm new password')}
          onChangeText={(text: string) => {
            setConfirm(text);
            setErrorMessage('');
          }}
          onFocus={() => setErrorMessage('')}
          secureTextEntry
        />
        <View>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title={t('buttons.save', 'Save')} onPress={handleSubmit} />
        <View style={{ paddingTop: 30 }} />
      </View>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
};

export default ChangePassword;

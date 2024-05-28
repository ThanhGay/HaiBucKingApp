import React, { useState } from 'react';
import { View, StatusBar, Alert, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authChangePassword, setDataUser } from '@/redux/features/authSlice';
import { apiChangePassword } from '@/api/auth';

const ChangePassword: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { user, token, isChangingPassWord, message } = useAppSelector(
    (state) => state.authState,
  );
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [validPassword, setValidPassword] = useState(true);
  const validatePassword = (str: string) => {
    setValidPassword(str.length > 5);
    setErrorMessage(
      t(
        'messages.error.password',
        'Your password must be at least 6 characters long',
      ),
    );
  };

  const handleSubmit = (args: {
    current: string;
    newPw: string;
    confirm: string;
  }) => {
    const { current, newPw, confirm } = args;

    validatePassword(newPw);

    if (validPassword && newPw !== confirm) {
      dispatch(
        authChangePassword({
          password: current,
          newPassword: newPw,
          token,
        }),
      );

      if (message === 'Success' && !isChangingPassWord) {
        (() =>
          Alert.alert(
            'Notice',
            t('messages.success.update.password', 'Your password is updated!'),
          ))();
        dispatch(setDataUser({ ...user, PassWord: newPw }));
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
        t(
          'messages.error.confirm-password',
          'Your password and confirm password do not match',
        ),
      );
    }
  };

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
        <Button
          title={t('buttons.save', 'Save')}
          onPress={() =>
            handleSubmit({
              current: password,
              newPw: newPassword,
              confirm: confirm,
            })
          }
          disable={isChangingPassWord}
        />
        <View style={{ paddingTop: 30 }} />
      </View>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
};

export default ChangePassword;

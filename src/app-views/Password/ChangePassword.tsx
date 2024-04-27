import React, { useState } from 'react';
import { View, StatusBar, Alert, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { apiChangePassword } from '@/api/auth';
import { setDataUser } from '@/redux/feature/authSlice';

const ChangePassword: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { user, token } = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async () => {
    if (newPassword.trim() === confirm.trim()) {
      if (password.trim() === user.PassWord) {
        const dataRes = await apiChangePassword({
          password: password.trim(),
          newPassword: newPassword.trim(),
          token,
        });

        if (dataRes.status) {
          (() => Alert.alert('Notice', 'Your password is updated!'))();
          dispatch(setDataUser({ ...user, PassWord: newPassword }));
          navigation.goBack();
        } else {
          setErrorMessage('The new password and current password match');
        }
      } else {
        setErrorMessage('Your password is incorrect.');
      }
    } else {
      setErrorMessage('New password and confirm password is not match.');
    }
  };

  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title={'Change Password'}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={'Your password'}
          onChangeText={(text: string) => {
            setPassword(text);
            setErrorMessage('');
          }}
          onFocus={() => setErrorMessage('')}
          secureTextEntry
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={'New password'}
          onChangeText={(text: string) => {
            setNewPassword(text);
            setErrorMessage('');
          }}
          onFocus={() => setErrorMessage('')}
          secureTextEntry
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={'Confirm new password'}
          onChangeText={(text: string) => {
            setConfirm(text);
            setErrorMessage('');
          }}
          onFocus={() => setErrorMessage('')}
          secureTextEntry
        />

        {errorMessage && (
          <View>
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Button title={'Save'} onPress={handleSubmit} />
        <View style={{ paddingTop: 30 }} />
      </View>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
};

export default ChangePassword;

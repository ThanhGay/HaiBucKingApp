import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';
import { useAppSelector } from '@/redux/hooks';
import { apiChangePassword } from '@/api/auth';

const ChangePassword: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { user, token } = useAppSelector((state) => state.authState);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async () => {
    const dataRes = await apiChangePassword({
      phoneNumber: user.PhoneNumber,
      password: password,
      newPassword: newPassword,
      token,
    });
    if (dataRes.msg === 'Success') {
      navigation.goBack();
    } else {
      console.log('Fail to change password');
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
          }}
          secureTextEntry
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={'New password'}
          onChangeText={(text: string) => {
            setNewPassword(text);
          }}
          secureTextEntry
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={'Confirm new password'}
          onChangeText={(text: string) => {
            setConfirm(text);
          }}
          secureTextEntry
        />
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

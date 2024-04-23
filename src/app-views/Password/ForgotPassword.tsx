import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';

const ForgotPassword: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const handleSummit = () => {
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
        title="Reset password"
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/phone.png')}
          title="Phone number"
          onChangeText={(text: string) => {
            setPhoneNumber(text);
          }}
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="New password"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Confirm new password"
          onChangeText={(text: string) => {
            setConfirm(text);
          }}
          secureTextEntry
        />
      </View>
      <Button title="Continue" onPress={handleSummit} />
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ paddingTop: 20 }} />
    </View>
  );
};

export default ForgotPassword;

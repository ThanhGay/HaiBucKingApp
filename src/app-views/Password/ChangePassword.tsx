import { View, Text, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';
import { useNavigation } from '@react-navigation/native';
export default function ChangePassword() {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [Confirm, setConfirm] = useState('');
  const handleSubmit = () => {
    console.log(
      JSON.stringify(
        `Password: ${password}, New Password: ${newPassword}, Confirm: ${Confirm}`,
      ),
    );
    navigation.goBack();
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
}

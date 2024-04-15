import { View, Text, StatusBar, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { Title, Box, Button, Footer } from '@/component/Component';
import { styles } from '@/component/styles';
import { useNavigation } from '@react-navigation/native';
export function Forgotpassword() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const handleSummit = () => {
    console.log(
      JSON.stringify(
        `Phonenumber: ${phoneNumber}, Password: ${password}, confirm: ${confirm}`,
      ),
    );
    navigation.navigate('ConfirmOTP');
  };
  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title="Reset password"
        onPressLeft={() => navigation.goBack()}
      ></Title>
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/phone.png')}
          title="Phone number"
          onChangeText={(text: string) => {
            setPhoneNumber(text);
          }}
        ></Box>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="New password"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry
        ></Box>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Confirm new password"
          onChangeText={(text: string) => {
            setConfirm(text);
          }}
          secureTextEntry
        ></Box>
      </View>
      <Button title="Continue" onPress={handleSummit} />
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ paddingTop: 20 }} />
    </View>
  );
}

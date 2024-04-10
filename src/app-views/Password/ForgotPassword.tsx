import { View, Text, StatusBar, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { Title, Box, Button, Footer } from '@/component/Component';
import { styles } from '@/component/styles';
import { useNavigation } from '@react-navigation/native';
export function Forgotpassword() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title title="Reset password" onPress={() => navigation.goBack()}></Title>
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/phone.png')}
          title="Phone number"
        ></Box>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="New password"
        ></Box>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Confirm new password"
        ></Box>
      </View>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('ConfirmOTP')}
      />
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ paddingTop: 20 }} />
    </View>
  );
}

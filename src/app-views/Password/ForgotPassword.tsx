import { View, Text, StatusBar, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { Title, Box, Button, Footer } from '@/component/Component';
import { styles } from '@/component/styles';
export function Forgotpassword() {
  return (
    <View style={styles.container}>
      <Title title="Reset password"></Title>
      <View style={styles.body}>
        <Box link="" title="Phone number"></Box>
        <Box link="" title="New password"></Box>
        <Box link="" title="Confirm new password"></Box>
      </View>
      <Button title="Continue" />
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ paddingTop: 20 }} />
    </View>
  );
}

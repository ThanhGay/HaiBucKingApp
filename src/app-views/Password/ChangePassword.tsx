import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';
export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <Title title={'Change Password'} />
      <View style={styles.body}>
        <Box link={''} title={'Your password'} />
        <Box link={''} title={'New password'} />
        <Box link={''} title={'Confirm new password'} />
      </View>
      <View style={styles.footer}>
        <Button title={'Save'} />
        <View style={{ paddingTop: 30 }} />
      </View>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
}

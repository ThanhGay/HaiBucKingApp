import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { Title, Box, Button } from '@/component/Component';
import { styles } from '@/component/styles';
import { useNavigation } from '@react-navigation/native';
export default function ChangePassword() {
  const navigation = useNavigation();
  const handleSubmit = () => {
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
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={'New password'}
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={'Confirm new password'}
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

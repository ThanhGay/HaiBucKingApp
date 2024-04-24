import React, { useEffect, useState } from 'react';
import { StatusBar, View, Keyboard, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Box, Button, Footer, Title } from '@/component/Component';
import { styles } from '@/component/styles';
// import { ModalDate } from '@app-modals';

const Signup: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showModal, setShowModal] = useState(false)
  const handleSubmit = () => {
    navigation.navigate('ConfirmOTP', {
      email,
      phoneNumber,
      birthday,
      password,
      continue: 'EnterUsername',
    });
  };

  // bật tắt footer
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title="Sign up"
        onPressLeft={() => navigation.goBack()}
      ></Title>
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/email.png')}
          title="Email"
          onChangeText={(text: string) => {
            setEmail(text);
          }}
        ></Box>
        <Box
          icon={require('@assets/icons/phone.png')}
          title="Phone number"
          onChangeText={(text: string) => {
            setPhoneNumber(text);
          }}
        />
        
        <Box
          icon={require('@assets/icons/cake.png')}
          title="Your birthday"
          onChangeText={(text: string) => {
            setBirthday(text);
          }}
        />

        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Password"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry
        ></Box>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Confirm password"
          onChangeText={(text: string) => {
            setConfirm(text);
          }}
          secureTextEntry
        ></Box>

        <Button title="Continue" onPress={handleSubmit} />
      </View>
      {!isKeyboardVisible && (
        <Footer title="By sign in or sign up, you argee to our Terms of Service and Privacy Policy"></Footer>
      )}
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};
export default Signup;

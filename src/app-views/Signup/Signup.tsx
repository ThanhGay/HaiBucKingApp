import React, { useEffect, useState } from 'react';
import { StatusBar, View, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { Box, Button, Footer, Title } from '@/component/Component';
import { styles } from '@/component/styles';

const emailRegex = new RegExp(
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
  'gm',
);

const dateRegex = new RegExp(
  /(19|20)\d{2}(\/|-)(0[1-9]|1[0,1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])/,
  'g',
);
const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
  'gm',
);

const Signup: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validBirthday, setValidBirthday] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const validateEmail = (str: string) => {
    setValidEmail(emailRegex.test(str));
    setErrorMessage(
      t('messages.error.email', 'Your email is not in the correct format'),
    );
  };

  const validatePhone = (str: string) => {
    setValidPhone(str.length === 10);
    setErrorMessage(
      t('messages.error.phone', 'Your phone number must be 10 digits'),
    );
  };

  const validateBirthday = (str: string) => {
    setValidBirthday(dateRegex.test(str));
    setErrorMessage(
      t(
        'messages.error.birthday',
        'Your birthday is not in the format YYYY/MM/DD',
      ),
    );
  };

  const validatePassword = (str: string) => {
    setValidPassword(passwordRegex.test(password));
    setErrorMessage(
      t(
        'messages.error.password',
        'Your password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      ),
    );
  };

  const handleSubmit = () => {
    validateEmail(email);
    validatePhone(phoneNumber);
    validateBirthday(birthday);
    validatePassword(password);

    if (
      validPhone &&
      validEmail &&
      validBirthday &&
      validPassword &&
      password === confirm
    ) {
      navigation.navigate('ConfirmOTP', {
        email,
        phoneNumber,
        birthday,
        password,
        continue: 'EnterUsername',
      });
    } else {
      setErrorMessage(
        t(
          'messages.error.confirm-password',
          'Your password and confirm password are not match',
        ),
      );
    }
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
        title={t('sign-up.title', 'Sign up')}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/email.png')}
          title="Email"
          onChangeText={(text: string) => {
            setEmail(text);
            validateEmail(text);
          }}
          valid={validEmail}
          errText={t('messages.error.email')}
        />
        <Box
          icon={require('@assets/icons/phone.png')}
          title="Phone Number"
          onChangeText={(text: string) => {
            setPhoneNumber(text);
            validatePhone(text);
          }}
          valid={validPhone}
          errText={t('messages.error.phone')}
        />

        <Box
          icon={require('@assets/icons/cake.png')}
          title="Your birthday (yyyy/mm/dd)"
          onChangeText={(text: string) => {
            setBirthday(text);
            validateBirthday(text);
          }}
          valid={validBirthday}
          errText={t('messages.error.birthday')}
        />

        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Password"
          onChangeText={(text: string) => {
            setPassword(text);
            validatePassword(text);
          }}
          secureTextEntry
          valid={validPassword}
          errText={t('messages.error.password')}
        />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Confirm password"
          onChangeText={(text: string) => {
            setConfirm(text);
          }}
          secureTextEntry
          valid={password === confirm}
          errText={t('messages.error.confirm-password')}
        />
        <Button title={t('buttons.continue')} onPress={handleSubmit} />
      </View>
      {!isKeyboardVisible && <Footer title={t('rule')} />}
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};
export default Signup;

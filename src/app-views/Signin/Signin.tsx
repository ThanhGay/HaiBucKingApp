import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { Title, Box, Button, Footer } from '@/component/Component';
import { styles } from '@/component/styles';
import colors from '@/utils/colors';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authLogin } from '@/redux/features/authSlice';

const Signin: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  let msg = '';
  const [isRemember, setIsRemember] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { isLoading, error, message, user, loginCode } = useAppSelector(
    (state) => state.authState,
  );

  const handleLogin = () => {
    dispatch(authLogin({ phoneNumber, password, isRemember }));
  };

  useEffect(() => {
    if (isLoading === true && error === false) {
      console.log('isLoading api ...');
    }
    if (isLoading === false && error === false) {
      console.log('Load api success');
      if (loginCode === true) {
        (() => Alert.alert(t('notice.notice', 'Notice'), message))();
        navigation.navigate('Home');
      } else {
        message
          ? (() => Alert.alert(t('notice.notice', 'Notice'), message))()
          : null;
      }
    }
    if (isLoading === false && error === true) {
      console.log('api rejected');
    }
  }, [loginCode, isLoading]);

  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title={t('sign-in.title', 'Sign in')}
        onPressLeft={() => navigation.goBack()}
      ></Title>
      <View style={styles.body}>
        <Box
          icon={require('@assets/icons/phone.png')}
          title={t('sign-in.phone', 'Phone number')}
          onChangeText={(text: string) => {
            setPhoneNumber(text);
          }}
        ></Box>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title={t('sign-in.password', 'Password')}
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry
        ></Box>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 6,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              thumbColor={colors.primary}
              trackColor={{ false: 'white', true: colors.primary }}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TouchableOpacity onPress={() => setIsRemember(!isRemember)}>
              <Text style={{ color: 'white', fontSize: 16 }}>
                {t('sign-in.remember', 'Remember me')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontStyle: 'italic',
                fontWeight: '500',
              }}
            >
              {t('sign-in.forgot', 'Forgot Password?')}
            </Text>
          </TouchableOpacity>
        </View>

        <Button title={t('buttons.login', 'Login')} onPress={handleLogin} />
      </View>
      <Footer
        title={t(
          'rule',
          'By sign in or sign up, you argee to our Terms of Service and Privacy Policy',
        )}
      />
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};

export default Signin;

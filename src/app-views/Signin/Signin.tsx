import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Switch } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Title, Box, Button, Footer } from '@/component/Component';
import { styles } from '@/component/styles';
import colors from '@/utils/colors';

import { apiSignIn } from '@/api/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setDataUser, setToken } from '@/redux/feature/authSlice';

const Signin: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [isRemember, set] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dataRes, setDataRes] = useState<any>(null);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const dataRes = await apiSignIn({ phoneNumber, password });
    setDataRes(dataRes);

    if (dataRes.status) {
      dispatch(setDataUser(dataRes?.data.data_user));
      dispatch(setToken(dataRes?.data.accesToken));
      console.log(dataRes.status);

      navigation.navigate('Home');
    } else {
      console.log('err');
    }
  };

  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title="Sign in"
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
          title="Password"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry
        ></Box>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              thumbColor={colors.primary}
              trackColor={{ false: 'white', true: colors.primary }}
              value={isRemember}
              onChange={() => set(!isRemember)}
            ></Switch>
            <TouchableOpacity onPress={() => set(!isRemember)}>
              <Text style={{ color: 'white', fontSize: 16 }}>Remember me</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        {dataRes && !dataRes.status && (
          <Text style={{ color: 'red' }}>
            Vui lòng nhập lại tài khoản, mật khẩu
          </Text>
        )}
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Footer title="By sign in or sign up, you argee to our Terms of Service and Privacy Policy"></Footer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};

export default Signin;

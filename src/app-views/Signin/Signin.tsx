import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
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
  let msg = '';
  const [isRemember, set] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dataRes, setDataRes] = useState<any>(null);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const _dataRes = await apiSignIn({ phoneNumber, password });
    setDataRes(_dataRes);

    if (_dataRes.status) {
      msg = _dataRes.msg;
      dispatch(setDataUser(_dataRes?.data.data_user));
      dispatch(setToken(_dataRes?.data.accesToken));
      navigation.navigate('Home');
    } else {
      msg = _dataRes.msg;
    }
    showResult();
  };

  const showResult = () => Alert.alert('Thông báo', msg);

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
              onChange={() => set(!isRemember)}
            ></Switch>
            <TouchableOpacity onPress={() => set(!isRemember)}>
              <Text style={{ color: 'white', fontSize: 16 }}>Remember me</Text>
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
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <Button title="Login" onPress={handleLogin} />
      </View>
      <Footer title="By sign in or sign up, you argee to our Terms of Service and Privacy Policy"></Footer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};

export default Signin;

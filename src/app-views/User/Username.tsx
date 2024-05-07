import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { styles } from '@/component/styles';
import { Box, Button, Title } from '@/component/Component';

import { apiSignUp } from '@/api/auth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  authRegister,
  setDataUser,
  setToken,
} from '@/redux/features/auth/authSlice';

interface EnterUsernameProps {
  route: any;
}

const EnterUsername: React.FC<
  EnterUsernameProps & { navigation: NavigationProp<any> }
> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, message, loginCode } = useAppSelector(
    (state) => state.authState,
  );

  let msg = '';
  const { birthday, email, password, phoneNumber } = route.params;
  const [username, setUsername] = useState('');

  // call API
  // const handleSubmit = async () => {
  //   const dataRes = await apiSignUp({
  //     phoneNumber: phoneNumber,
  //     password: password,
  //     fullname: username,
  //     email: email,
  //     dob: birthday,
  //   });

  //   if (dataRes.status) {
  //     msg = dataRes.msg;
  //     dispatch(setDataUser(dataRes?.data.data_user));
  //     dispatch(setToken(dataRes?.data.accesToken));
  //     navigation.navigate('Home');
  //   } else {
  //     msg = dataRes.msg;
  //     console.log('err sign up');
  //   }

  //   (() => Alert.alert('Thông báo', msg))();
  // };

  // use redux
  const handleSubmit = async () => {
    dispatch(
      authRegister({
        phoneNumber: phoneNumber,
        password: password,
        fullname: username,
        email: email,
        dob: birthday,
      }),
    );
  };

  useEffect(() => {
    if (isLoading === true && error === false) {
      console.log('isLoading api ...');
    }
    if (isLoading === false && error === false) {
      console.log('Load api success');
      if (loginCode === true) {
        (() => Alert.alert('Thông báo', message))();
        navigation.navigate('Home');
      } else {
        message ? (() => Alert.alert('Thông báo', message))() : null;
      }
    }
    if (isLoading === false && error === true) {
      console.log('api rejected');
    }
  }, [loginCode, isLoading]);

  return (
    <View style={styles.container}>
      <Title leftIcon title="" onPressLeft={() => navigation.goBack()} />
      <View style={styles.body}>
        <Text style={{ fontSize: 30, color: '#FCC435' }}>Enter Username</Text>
        <Text style={{ fontSize: 15, color: '#FFFFFF' }}>
          Latin characters, no emoji/symbols
        </Text>
        <Box
          icon={require('@assets/icons/user.png')}
          title="Username"
          onChangeText={(text: string) => {
            setUsername(text);
          }}
        />
      </View>
      <Button title="Done" onPress={handleSubmit} />
      <View style={{ paddingTop: 20 }} />
    </View>
  );
};
export default EnterUsername;

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { styles } from '@/component/styles';
import { Box, Button, Title } from '@/component/Component';

import { apiSignUp } from '@/api/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setDataUser, setToken } from '@/redux/feature/authSlice';

interface EnterUsernameProps {
  route: any;
}

const EnterUsername: React.FC<
  EnterUsernameProps & { navigation: NavigationProp<any> }
> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { birthday, email, password, phoneNumber } = route.params;
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    const dataRes = await apiSignUp({
      phoneNumber: phoneNumber,
      password: password,
      fullname: username,
      email: email,
      dob: birthday,
    });
    if (dataRes.status) {
      dispatch(setDataUser(dataRes?.data.data_user));
      dispatch(setToken(dataRes?.data.accesToken));
      navigation.navigate('Home');
    } else {
      console.log('err sign up');
    }
  };
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

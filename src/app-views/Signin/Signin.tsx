import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Switch } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Title, Box, Button, Footer } from '@/component/Component';
import { styles } from '@/component/styles';
import colors from '@/utils/colors';

const Signin: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [isRemember, set] = useState(true);
  return (
    <View style={styles.container}>
      <Title title="Sign in" onPress={() => navigation.goBack()}></Title>
      <View style={styles.body}>
        <Box link="" title="Phone number"></Box>
        <Box link="" title="Password"></Box>
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
        <Button title="Continue" onPress={() => navigation.navigate('Home')} />
      </View>
      <Footer title="By sign in or sign up, you argee to our Terms of Service and Privacy Policy"></Footer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};

export default Signin;

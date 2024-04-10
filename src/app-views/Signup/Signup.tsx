import { StatusBar, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Button, Footer, Title } from '@/component/Component';
import { styles } from '@/component/styles';

const Signup = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title="Sign up"
        onPressLeft={() => navigation.goBack()}
      ></Title>
      <View style={styles.body}>
        <Box icon={require('@assets/icons/email.png')} title="Email"></Box>
        <Box
          icon={require('@assets/icons/phone.png')}
          title="Phone number"
        ></Box>
        <Box icon={require('@assets/icons/cake.png')} title="Your birthday" />
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Password"
        ></Box>
        <Box
          icon={require('@assets/icons/key-password.png')}
          title="Confirm password"
        ></Box>
        <Button
          title="Continue"
          onPress={() => navigation.navigate('ConfirmOTP')}
        />
      </View>
      <Footer title="By sign in or sign up, you argee to our Terms of Service and Privacy Policy"></Footer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};
export default Signup;

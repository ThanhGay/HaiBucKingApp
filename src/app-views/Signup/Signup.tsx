import { StatusBar, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Button, Footer, Title } from '@/component/Component';
import { styles } from '@/component/styles';

const Signup = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Title title="Sign up" onPress={() => navigation.goBack()}></Title>
      <View style={styles.body}>
        <Box link="" title="Email"></Box>
        <Box link="" title="Phone number"></Box>
        <Box link="" title="Password"></Box>
        <Box link="" title="Confirm password"></Box>
        <Button title="Continue" onPress={() => navigation.navigate('ConfirmOTP')} />
      </View>
      <Footer title="By sign in or sign up, you argee to our Terms of Service and Privacy Policy"></Footer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};
export default Signup;

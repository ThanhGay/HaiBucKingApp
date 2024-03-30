import { styles } from '@/component/styles';
import { Box, Button, Footer, Title } from '@/component/Component';
import { StatusBar, View } from 'react-native';

export function Signup() {
  return (
    <View style={styles.container}>
      <Title title="Sign up"></Title>
      <View style={styles.body}>
        <Box link="" title="Email"></Box>
        <Box link="" title="Phone number"></Box>
        <Box link="" title="Password"></Box>
        <Box link="" title="Confirm password"></Box>
        <Button title="Continue" />
      </View>
      <Footer title="By sign in or sign up, you argee to our Terms of Service and Privacy Policy"></Footer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
}

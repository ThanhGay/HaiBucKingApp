import { styles } from '@/component/styles';
import { Box, Button, Footer, Title } from '@/component/Component';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function EnterUsername() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title leftIcon title="" onPressLeft={() => navigation.goBack()}></Title>
      <View style={styles.body}>
        <Text style={{ fontSize: 30, color: '#FCC435' }}>Enter Username</Text>
        <Text style={{ fontSize: 15, color: '#FFFFFF' }}>
          Latin characters, no emoji/symbols
        </Text>
        <Box icon={require('@assets/icons/user.png')} title="Username" />
      </View>
      <Button title="Done" onPress={() => navigation.navigate('Home')} />
      <View style={{ paddingTop: 20 }} />
    </View>
  );
}

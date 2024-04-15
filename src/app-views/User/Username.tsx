import { styles } from '@/component/styles';
import { Box, Button, Footer, Title } from '@/component/Component';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
export default function EnterUsername() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const handleSubmit = () => {
    console.log(JSON.stringify(`Username: ${username}`));
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Title leftIcon title="" onPressLeft={() => navigation.goBack()}></Title>
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
}

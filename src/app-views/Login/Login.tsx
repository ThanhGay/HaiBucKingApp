import { Text, TouchableOpacity, View } from 'react-native';

function Login({ navigation }) {

  const handleChange = () => {
    // goi API
    navigation.navigate('Home');
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text>Login</Text>
      
      <TouchableOpacity onPress={handleChange}>
        <View style={{ backgroundColor: 'blue' }}>
          <Text>Go to Home</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

export default Login;

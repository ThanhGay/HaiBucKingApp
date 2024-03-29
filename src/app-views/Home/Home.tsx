import { LeftArrowIcon } from '@/app-uikits/icon';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text>Home Page</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
            {/* <SvgXml xml={LeftArrowIcon()}  /> */}
            <Text>Back to Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

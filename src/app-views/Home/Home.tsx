import BottomTab from '@/app-navigation/BottomTabs/BottomTab';
import { LeftArrowIcon } from '@/app-uikits/icon';
import { styles } from '@/component/styles';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <View style={{ flex: 9 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <SvgXml xml={LeftArrowIcon()}  /> */}
          <Text>Back to Login</Text>
        </TouchableOpacity>
      </View>
      <BottomTab />
    </View>
  );
}

export default Home;

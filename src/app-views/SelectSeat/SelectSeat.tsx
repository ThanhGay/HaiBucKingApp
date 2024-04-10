import { Button } from '@/app-components';
import { Title } from '@/component/Component';
import { styles } from '@/component/styles';
import colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';

function SelectSeat() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title leftIcon title="Select Seat" onPressLeft={navigation.goBack} />
      <Button
        title="Buy Ticket"
        onPress={() => navigation.navigate('Payment')}
      />
    </View>
  );
}

export default SelectSeat;

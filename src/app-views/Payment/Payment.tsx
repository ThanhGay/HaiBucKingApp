import { styles } from '@/component/styles';
import colors from '@/utils/colors';
import { View, Text } from 'react-native';

const Payment = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.whiteText }}>Payment page</Text>
    </View>
  );
};

export default Payment;

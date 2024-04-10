import DetailTicket from '@/app-components/DetailTicket';
import colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function Success() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
      }}
    >
      <View style={styles.header}>
        <View style={{ width: 40, height: 40 }} />
        <Text style={styles.title}>Success</Text>
        <View style={{ width: 40, height: 40 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Ticket')}>
            <Image
              source={require('@/assets/icons/tick.png')}
              style={{ height: 40, width: 40 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <DetailTicket />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  title: { fontSize: 28, fontWeight: '700', color: colors.white },
});

export default Success;

import DetailTicket from '@/app-components/DetailTicket';
import colors from '@/utils/colors';
import { View, Text, StyleSheet } from 'react-native';

function Success() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <View style={styles.header}>
        <View style={{ width: 40, height: 40 }} />
        <Text style={styles.title}>Success</Text>
        <View style={{ width: 40, height: 40 }}>
          <Text style={{ color: colors.whiteText }}>V</Text>
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
  title: { fontSize: 20, fontWeight: '700', color: colors.white },
});

export default Success;

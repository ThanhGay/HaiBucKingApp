import colors from '@/utils/colors';
import { StyleSheet, Text, View } from 'react-native';
import TicketItem from './TicketItem';

const listTicket = [
  {
    key: 1,
    movie: 'Avengers: Infinity War',
    time: "14h15'",
    date: '16/12/2022',
    location: 'CGV Vincom Ocean Park',
  },
  {
    key: 2,
    movie: 'Batman Vs Superman',
    time: "15h30'",
    date: '22/12/2022',
    location: 'CGV Vincom Ocean Park',
  },
  {
    key: 3,
    movie: 'Guardians of The Galaxy',
    time: "14h15'",
    date: '29/12/2022',
    location: 'CGV Vincom Ocean Park',
  },
];

const MyTicket = () => {
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>My ticket</Text>
      </View>

      <View style={{gap: 16}}>
        {listTicket.map((item) => (
          <TicketItem key={item.key} ticket={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.black,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.whiteText,
    marginBottom: 32,
  },
});

export default MyTicket;

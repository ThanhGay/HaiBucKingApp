import colors from '@/utils/colors';
import { StyleSheet, Text, View } from 'react-native';
import TicketItem from './TicketItem';
import BottomTab from '@/app-navigation/BottomTabs/BottomTab';
import { useNavigation } from '@react-navigation/native';
import { Title } from '@/component/Component';

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

const Ticket = () => {
  return (
    <View style={styles.container}>
      <Title title="My ticket" />

      <View style={{ flex: 9, gap: 16 }}>
        {listTicket.map((item) => (
          <TicketItem key={item.key} ticket={item} />
        ))}
      </View>

      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.whiteText,
    marginBottom: 32,
  },
});

export default Ticket;

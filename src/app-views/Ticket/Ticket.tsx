import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import BottomTab from '@/app-navigation/BottomTabs/BottomTab';
import TicketItem from './TicketItem';
import { Title } from '@/component/Component';
import colors from '@/utils/colors';
import { useAppSelector } from '@/redux/hooks';

const listTicket = [
  {
    key: 1,
    movie: 'Avengers: Infinity War',
    time: "14h15'",
    date: '16/12/2022',
    location: 'CGV Vincom Ocean Park',
    poster: require('@assets/images/movie-3.png'),
  },
  {
    key: 2,
    movie: 'Batman Vs Superman',
    time: "15h30'",
    date: '22/12/2022',
    location: 'CGV Vincom Ocean Park',
    poster: require('@assets/images/movie-2.png'),
  },
  {
    key: 3,
    movie: 'Guardians of The Galaxy',
    time: "14h15'",
    date: '29/12/2022',
    location: 'CGV Vincom Ocean Park',
    poster: require('@assets/images/movie-4.png'),
  },
];

const Ticket: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { listTicket } = useAppSelector((state) => state.userState);
console.log(listTicket);

  return (
    <View style={styles.container}>
      <Title title="My ticket" />

      <View style={{ flex: 9, gap: 16 }}>
        {listTicket.length > 0 ? (
          listTicket.map((item, idx) => (
            <TicketItem key={idx} ticket={item} navigation={navigation} />
          ))
        ) : (
          <Text style={{ color: colors.whiteText, textAlign: 'center' }}>
            Hiện chưa có vé nào được đặt
          </Text>
        )}
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

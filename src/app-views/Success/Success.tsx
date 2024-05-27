import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import DetailTicket from '@app-components/DetailTicket';
import { Title } from '@/component/Component';
import colors from '@/utils/colors';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addTicket } from '@/redux/features/ticketSlice';

interface SuccessProps {
  route: any;
}

const Success: React.FC<SuccessProps & { navigation: NavigationProp<any> }> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation();
  // const ticket = route.params;
  const { bookingTicket } = useAppSelector((state) => state.ticketState);
  const ticket = {
    StartTime: bookingTicket.showtime,
    Movie_Name: bookingTicket.movieName,
    Movie_Id: bookingTicket.movieId,
    Poster: bookingTicket.poster,
    Duration: bookingTicket.duration,
    CategoryList: bookingTicket.categories,
    Room_Id: bookingTicket.room,
    Seat_Id: bookingTicket.seats.toString(),
    Price: bookingTicket.amount,
    Invoice_Id: bookingTicket.invoiceId,
  };

  const mapTicket = {
    ...ticket,
    StartTime: ticket.StartTime.replaceAll('/', '-').replaceAll(' ', 'T'),
  };

  const dispatch = useAppDispatch();
  dispatch(addTicket(mapTicket));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
      }}
    >
      <View style={styles.header}>
        <Title
          title={t('success.title', 'Success')}
          rightIcon={
            <Image
              style={{ width: 40, height: 40 }}
              source={require('@assets/icons/tick.png')}
            />
          }
          onPressRight={() => navigation.navigate('Ticket')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <DetailTicket ticket={mapTicket} />
      </View>
    </View>
  );
};

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

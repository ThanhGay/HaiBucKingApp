import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import DetailTicket from '@app-components/DetailTicket';
import { Title } from '@/component/Component';
import colors from '@/utils/colors';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addTicket, saveInvoice } from '@/redux/features/ticketSlice';

interface SuccessProps {
  route: any;
}

const Success: React.FC<SuccessProps & { navigation: NavigationProp<any> }> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.authState);
  const { bookingTicket, isLoading } = useAppSelector(
    (state) => state.ticketState,
  );
  const ticket = route.params?.ticket;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addTicket(ticket));
  }, [dispatch, ticket]);

  const handleTick = async ({
    invoice,
    token,
  }: {
    invoice: any;
    token: string;
  }) => {
    dispatch(
      saveInvoice({
        token,
        invoiceId: invoice.invoiceId,
        invoiceDate: invoice.invoiceDate,
        movieName: invoice.movieName,
        duration: invoice.duration,
        category: invoice.categories,
        poster: invoice.poster,
        startTime: invoice.showtime,
        roomId: invoice.room,
        seatId: invoice.seats.toString().replaceAll(',', ', '),
        price: invoice.amount,
      }),
    );

    if (!isLoading) {
      navigation.navigate('Ticket');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <View style={styles.header}>
        <Title
          title={t('success.title', 'Success')}
          rightIcon={
            <Image
              style={{ width: 40, height: 40 }}
              source={require('@assets/icons/tick.png')}
            />
          }
          onPressRight={() => handleTick({ invoice: bookingTicket, token })}
        />
      </View>
      <View style={{ flex: 1 }}>
        <DetailTicket ticket={ticket} />
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

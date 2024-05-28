import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  AppState,
  BackHandler,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { CountdownTimer } from '@app-components';
import MovieItem from '@app-components/Movie/MovieItem';
import { Button, Title } from '@/component/Component';
import { styles } from '@/component/styles';
import colors from '@/utils/colors';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { activeTransaction } from '@/redux/features/ticketSlice';
import { apiActiveTransaction } from '@/api/ticket';

const paymentMethod = [
  {
    key: 1,
    link_img: require('@assets/Payment/Zalo.png'),
    name: 'Zalo Pay',
  },
  {
    key: 2,
    link_img: require('@assets/Payment/Momo.png'),
    name: 'MoMo',
  },
  {
    key: 3,
    link_img: require('@assets/Payment/Shopee.png'),
    name: 'Shopee Pay',
  },
  {
    key: 4,
    link_img: require('@assets/Payment/ATM.png'),
    name: 'ATM Card',
  },
  {
    key: 5,
    link_img: require('@assets/Payment/Visa.png'),
    name: 'International payments',
  },
];

const Payment: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const [loadTracsaction, setLoadTransaction] = useState(true)
  const { token } = useAppSelector((state) => state.authState);
  const { bookingTicket, statusTransaction } = useAppSelector(
    (state) => state.ticketState,
  );
  const dispatch = useAppDispatch();

  const [activeMethod, setActiveMethod] = useState<number>(-1);
  const seat_Ids = bookingTicket.seats.toString().replace(',', ', ');

  console.log('Transaction in invoiceId', bookingTicket.invoiceId);

  const movie = {
    Movie_Name: bookingTicket.movieName,
    star: 0,
    totalRate: 0,
    Duration: bookingTicket.duration,
    Categories: bookingTicket.categories,
    Poster: bookingTicket.poster,
  };
  const mapTicket = {
    StartTime: bookingTicket.showtime.replaceAll('/', '-').replaceAll(' ', 'T'),
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

  const commitTransaction = async () => {
    if (activeMethod > 0) {
      const dataRes = await apiActiveTransaction({ decision: 1 });
      if (dataRes.status) {
        console.log('commit success', bookingTicket.invoiceId);
        navigation.navigate('Success',{ ticket: mapTicket });
      }
    } else {
      (() => Alert.alert('Warning', 'Please choose your payment method'))();
    }
  };

  const rollbackTransaction = async () => {
    const dataRes = await apiActiveTransaction({ decision: 0 });
    if (dataRes.status) {
      console.log('rollback success', bookingTicket.invoiceId);
      navigation.goBack();
    }
  };

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: any) => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      await rollbackTransaction();
    }
  };
  useEffect(() => {
    const backAction = () => {
      (async () => {
        await rollbackTransaction();
        // navigation.goBack();
      })();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Title
        leftIcon
        title={t('payment.title', 'Payment')}
        onPressLeft={rollbackTransaction}
      />
      <View style={{ flex: 8 }}>
        <ScrollView>
          <View style={{}}>
            <MovieItem film={movie} direction="row" navigation={navigation} />
            {/* OrderID */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 32,
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.whiteText,
                }}
              >
                Order ID
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.whiteText,
                }}
              >
                {bookingTicket.invoiceId}
              </Text>
            </View>
            {/*  Seat */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 24,
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.whiteText,
                }}
              >
                {t('payment.seat', 'Seat')}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.whiteText,
                }}
              >
                {seat_Ids}
              </Text>
            </View>
            {/* Kẻ */}
            <View
              style={{ height: 1, backgroundColor: '#59595A', marginTop: 32 }}
            />
            {/* Total */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 32,
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',

                  color: colors.whiteText,
                }}
              >
                {t('payment.total', 'Total')}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: colors.primary,
                }}
              >
                {bookingTicket.amount} VND
              </Text>
            </View>
            {/* Payment Method */}
            <Text
              style={{
                color: colors.whiteText,
                fontSize: 24,
                fontWeight: '700',
                marginTop: 32,
              }}
            >
              {t('payment.method', 'Payment Method')}
            </Text>
            {/* Pay */}
            <View style={{ marginTop: 24 }}>
              {paymentMethod.map((item) => (
                <ButtonPayment
                  key={item.key}
                  link_img={item.link_img}
                  name={item.name}
                  style={{
                    borderColor:
                      item.key === activeMethod
                        ? colors.primary
                        : colors.blackOpacity,
                    backgroundColor:
                      item.key === activeMethod
                        ? '#261D08'
                        : colors.blackOpacity,
                  }}
                  onPress={() => setActiveMethod(item.key)}
                />
              ))}
            </View>
          </View>
          <View
            style={{
              padding: 16,
              backgroundColor: '#271D08',
              marginTop: 16,
              borderRadius: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.whiteText,
              }}
            >
              {t('payment.countdown', 'Complete your payment in')}
            </Text>

            <CountdownTimer
              durationInSeconds={15 * 60}
              colorText={colors.primary}
            />
          </View>
        </ScrollView>
      </View>

      <Button title={t('buttons.continue')} onPress={commitTransaction} />
    </View>
  );
};

function ButtonPayment({
  link_img,
  name,
  style,
  onPress,
}: {
  link_img: any;
  name: string;
  style?: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        ...style,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={link_img} style={{ height: 48, width: 86 }} />
          <Text
            style={{
              color: colors.whiteText,
              fontWeight: '500',
              marginLeft: 16,
              fontSize: 16,
            }}
          >
            {name}
          </Text>
        </View>
        <Image
          style={{ height: 24, width: 24 }}
          source={require('@assets/icons/right.png')}
        />
      </View>
    </TouchableOpacity>
  );
}

export default Payment;

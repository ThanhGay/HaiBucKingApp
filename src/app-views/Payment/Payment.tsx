import { Button, Title } from '@/component/Component';
import { styles } from '@/component/styles';
import colors from '@/utils/colors';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Movie from '../Movie/Movie';
import BottomTab from '@/app-navigation/BottomTabs/BottomTab';
import MovieItem from '../Movie/components/MovieItem';
import { useNavigation } from '@react-navigation/native';

const Payment = () => {
  const navigation = useNavigation();

  const movie1 = {
    key: 1,
    name: 'Panda',
    star: 4,
    totalRate: 982,
    duration: '124',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-8.png'),
  };
  const OrderID = 78889377726;
  const Seat = 'H7, H8';
  const Total = '210.000';
  return (
    <View style={styles.container}>
      <Title leftIcon title="Payment" onPressLeft={() => navigation.goBack()} />
      <View style={{ flex: 8 }}>
        <ScrollView>
          <View style={{}}>
            <MovieItem film={movie1} direction="row" />
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
                {OrderID}
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
                Seat
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.whiteText,
                }}
              >
                {Seat}
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
                Total
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: colors.primary,
                }}
              >
                {Total} VND
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
              Payment Method
            </Text>
            {/* Pay */}
            <View style={{ marginTop: 24 }}>
              <ButtonPayment
                link={require('@assets/Payment/Zalo.png')}
                Payment="Zalo Pay"
              />
              <ButtonPayment
                link={require('@assets/Payment/Momo.png')}
                Payment="MoMo"
              />
              <ButtonPayment
                link={require('@assets/Payment/Shopee.png')}
                Payment="Shopee Pay"
              />
              <ButtonPayment
                link={require('@assets/Payment/ATM.png')}
                Payment="ATM Card"
              />
              <ButtonPayment
                link={require('@assets/Payment/Visa.png')}
                Payment="International payments"
              />
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
              Complete your payment in
            </Text>
            <Text
              style={{ color: colors.primary, fontSize: 16, fontWeight: '700' }}
            >
              15:00
            </Text>
          </View>
        </ScrollView>
      </View>

      <Button title="Continue" onPress={() => navigation.navigate('Success')} />
    </View>
  );
};

function ButtonPayment({ link, Payment }: { link: any; Payment: string }) {
  return (
    <TouchableOpacity
      style={{
        // marginHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#1C1C1C',
        padding: 16,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={link} style={{ height: 48, width: 86 }} />
          <Text
            style={{
              color: colors.whiteText,
              fontWeight: '500',
              marginLeft: 16,
              fontSize: 16,
            }}
          >
            {Payment}
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

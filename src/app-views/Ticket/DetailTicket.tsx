import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Title } from '@/component/Component';
import colors from '@/utils/colors';
import { convert_Time, formatDate } from '@/utils/hooks';

const DetailTicket = ({ route }: { route?: any }) => {
  const ticket = route.params;

  const navigation = useNavigation();
  return (
    <View style={{ paddingHorizontal: 16, backgroundColor: 'black', flex: 1 }}>
      <Title
        leftIcon
        title="My ticket"
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {/* Description Movie */}
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={
              ticket?.Poster
                ? { uri: ticket?.Poster }
                : require('@assets/images/movie-1.png')
            }
            alt="poster"
            style={styles.poster}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{ticket?.Movie_Name}</Text>
            <View style={{ flexDirection: 'column', gap: 4 }}>
              <View style={styles.row}>
                <Image
                  source={require('@assets/icons/clock-black.png')}
                  alt="icon"
                  height={16}
                  width={16}
                  style={styles.icon_S}
                />
                <Text style={styles.text}>
                  {convert_Time(ticket?.Duration)}
                </Text>
              </View>
              <View style={styles.row}>
                <Image
                  source={require('@assets/icons/camera-black.png')}
                  alt="icon"
                  height={16}
                  width={16}
                  style={styles.icon_S}
                />
                <Text style={styles.text}>{ticket?.CategoryList}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Calendar & Seat */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 36,
            marginBottom: 16,
            paddingBottom: 32,
            borderBottomColor: colors.black,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('@assets/icons/calendar-black.png')}
              alt="calendar"
              style={styles.icon_L}
            />
            <View>
              <Text style={[styles.text, { marginBottom: 8 }]}>
                {ticket?.Time}
              </Text>
              <Text style={styles.text}>{formatDate(ticket?.Date)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('@assets/icons/seat.png')}
              alt="calendar"
              style={styles.icon_L}
            />
            <View>
              <Text style={[styles.text, { marginBottom: 8 }]}>
                Section {ticket?.Room_Id}
              </Text>
              <Text style={styles.text}>Seat {ticket?.Seat_Id}</Text>
            </View>
          </View>
        </View>

        {/* Money, CinemaAddress, Note */}
        <View
          style={{
            paddingBottom: 22,
            borderStyle: 'dashed',
            borderBottomWidth: 1,
            borderBottomColor: colors.black,
          }}
        >
          <View
            style={{ ...styles.row, alignItems: 'flex-start', marginBottom: 8 }}
          >
            <Image
              source={require('@assets/icons/coin-black.png')}
              alt="coin"
              style={styles.icon_M}
            />
            <View>
              <Text style={{ ...styles.text, fontSize: 16, fontWeight: '700' }}>
                {ticket?.Price}d
              </Text>
            </View>
          </View>
          <View
            style={{
              ...styles.row,
              alignItems: 'flex-start',
              marginBottom: 8,
            }}
          >
            <Image
              source={require('@assets/icons/marker-black.png')}
              alt="location"
              style={styles.icon_M}
            />
            <View style={{ width: '95%' }}>
              <Text style={{ ...styles.text, fontSize: 16, fontWeight: '700' }}>
                CGV Vincom Ocean Park
              </Text>
              <Text style={{ ...styles.text, marginTop: 4 }}>
                4th floor, Vincom Ocean Park, Da Ton, Gia Lam, Ha Noi
              </Text>
            </View>
          </View>
          <View
            style={{ ...styles.row, alignItems: 'flex-start', marginBottom: 8 }}
          >
            <Image
              source={require('@assets/icons/note-black.png')}
              alt="note"
              style={styles.icon_M}
            />
            <View style={{ width: '95%' }}>
              <Text style={styles.text}>
                Show this QR code to the ticket counter to receive your ticket
              </Text>
            </View>
          </View>
        </View>

        {/* QR code */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('@assets/images/QRcode.png')}
            style={{
              marginTop: 44,
              marginBottom: 8,
              width: '100%',
              height: 100,
            }}
          />
          <Text style={styles.text}>Oder ID: {ticket?.Invoice_Id}</Text>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: -10 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  poster: {
    width: 125,
    height: 177,
    borderRadius: 13.4,
  },
  rightContainer: {
    marginLeft: 16,
    paddingTop: 10,
    gap: 8,
    flexDirection: 'column',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 20,
    fontWeight: '700',
    color: colors.blackText,
  },
  icon_S: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  icon_M: {
    marginRight: 8,
    width: 24,
    height: 24,
  },
  icon_L: {
    marginRight: 8,
    width: 48,
    height: 48,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.blackText,
  },
});

export default DetailTicket;

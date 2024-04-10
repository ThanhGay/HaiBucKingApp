import { Title } from '@/component/Component';
import colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';

const DetailTicket = ({ ticket }: { ticket?: any }) => {
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
            source={require('@assets/images/movie-4.png')}
            alt="poster"
            style={styles.poster}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>Avengers: Inifinity war</Text>
            <View style={{ flexDirection: 'column', gap: 4 }}>
              <View style={styles.row}>
                <Image
                  source={require('@assets/icons/clock-black.png')}
                  alt="icon"
                  height={16}
                  width={16}
                  style={styles.icon_S}
                />
                <Text style={styles.text}>2 hours 5 minutes</Text>
              </View>
              <View style={styles.row}>
                <Image
                  source={require('@assets/icons/camera-black.png')}
                  alt="icon"
                  height={16}
                  width={16}
                  style={styles.icon_S}
                />
                <Text style={styles.text}>Action, Adventure, Sci-fi</Text>
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
              <Text style={[styles.text, { marginBottom: 8 }]}>14h15'</Text>
              <Text style={styles.text}>10.12.2022</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('@assets/icons/seat.png')}
              alt="calendar"
              style={styles.icon_L}
            />
            <View>
              <Text style={[styles.text, { marginBottom: 8 }]}>Section 4</Text>
              <Text style={styles.text}>Seat H7, H8</Text>
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
                210.000d
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
          <Text style={styles.text}>Oder ID: 78889377726 </Text>
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
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Title } from '@/component/Component';
import colors from '@/utils/colors';
// ModalDate
import ModalDate from '../../app-modals/ModalDate';
// DatePicker
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';

const SelectSeat: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [Reserved, setReserved] = useState(true);
  const [showModal, setshowModal] = useState(false);

  // Date
  const [active, setActive] = useState<string>('');
  const [selectedDate, setSelectDate] = useState<any>(null);

  const today = new Date();

  today.setDate(today.getDate());

  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index);
    return {
      key: index.toString(),
      name: getFormatedDate(date, 'YYYY/MM/DD'),
    };
  });
  const handleDateSelection = (key: string) => {
    setActive(key);
    const selectedDate = dates.find((date) => date.key === key);
    if (selectedDate) {
      setSelectDate(selectedDate.name);

      console.log(selectedDate.name);
    }
  };

  //end
  const handleSeatSelection = (seatNumber: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      }
      setReserved(true);

      console.log(seatNumber);

      return [...prevSelectedSeats, seatNumber];
    });
  };
  const handleConfirmSelection = () => {
    const sortedSelectedSeats = selectedSeats.sort();
    setReserved(!!sortedSelectedSeats.length);
    console.log('Selected seats:', sortedSelectedSeats);
    console.log('Date:', selectedDate);

    if (!!sortedSelectedSeats.length) {
      // Chọn ghế mới sang Payment

      navigation.navigate('Payment');
    }
  };

  return (
    <View style={styles.container}>
      <Title leftIcon title="Select Seat" onPressLeft={navigation.goBack} />
      <View style={{ flex: 8 }}>
        <Image
          source={require('@assets/images/movie-screen.png')}
          style={{ width: '110%', marginTop: -30, alignSelf: 'center' }}
          resizeMode="contain"
        />
        {/* <Text style={{ ...styles.title, textAlign: 'center' }}>
          Select your seats
        </Text> */}
        <View style={styles.seatContainer}>
          {Array.from({ length: 4 }, (_, rowIndex) => {
            const rowLetter = String.fromCharCode(65 + rowIndex);
            return (
              <View key={rowLetter} style={styles.rowContainer}>
                {Array.from({ length: 6 }, (_, columnIndex) => {
                  const seatNumber = `${rowLetter}${columnIndex + 1}`;
                  let Reserved = false;
                  const Reserveds = [
                    'A1',
                    'A2',
                    'b3',
                    'B5',
                    'c4',
                    'C6',
                    'D1',
                    'D3',
                  ];
                  const ReservedsUpper = Reserveds.map((seat) =>
                    seat.toUpperCase(),
                  );
                  if (ReservedsUpper.includes(seatNumber)) {
                    Reserved = true;
                  }
                  return (
                    <TouchableOpacity
                      key={seatNumber}
                      style={[
                        styles.seat,
                        { backgroundColor: Reserved ? '#271D08' : '#1C1C1C' },

                        selectedSeats.includes(seatNumber) &&
                          styles.selectedSeat,
                      ]}
                      disabled={Reserved}
                      onPress={() => handleSeatSelection(seatNumber)}
                    >
                      <Text
                        style={[
                          styles.seatNumber,
                          {
                            color: Reserved ? colors.primary : colors.whiteText,
                          },
                          selectedSeats.includes(seatNumber) && {
                            color: colors.black,
                          },
                        ]}
                      >
                        {seatNumber}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        {!Reserved && (
          <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            <Text style={{ color: 'red' }}>
              Xin vui lòng chọn ghế mà bạn mong muốn
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 12,
                borderWidth: 1,
                backgroundColor: '#1C1C1C',
                borderColor: '#BFBFBF',
                marginRight: 10,
              }}
            />
            <Text style={{ color: colors.whiteText }}>Available</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 12,
                borderWidth: 1,
                backgroundColor: '#261D08',
                borderColor: '#BFBFBF',
                marginRight: 10,
              }}
            />
            <Text style={{ color: colors.whiteText }}>Reserved</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 12,
                borderWidth: 1,
                backgroundColor: '#FCC434',
                borderColor: '#BFBFBF',
                marginRight: 10,
              }}
            />
            <Text style={{ color: colors.whiteText }}>Selected</Text>
          </View>
        </View>
      </View>

      {/* Modal */}
      <TouchableOpacity onPress={() => setshowModal(true)}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 20,
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          Open
        </Text>
      </TouchableOpacity>
      {/* end Modal */}
      {/* DatePicker */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {dates.map((item) => {
          // Tách chuỗi thành ngày, tháng và năm
          const [year, month, day] = item.name.split('/');
          const monthNames: { [key: string]: string } = {
            '01': 'Jan',
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'Jun',
            '07': 'Jul',
            '08': 'Aug',
            '09': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec',
          };
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => handleDateSelection(item.key)}
            >
              <View
                style={{
                  backgroundColor:
                    item.key === active ? colors.primary : colors.blackOpacity,
                  borderRadius: 32,
                  height: 100,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: item.key === active ? colors.black : '#F2F2F2',
                    marginBottom: 12,
                  }}
                >
                  {monthNames[month]}
                </Text>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: '#2F2F2F',
                    borderRadius: 40,
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color:
                        item.key === active
                          ? colors.whiteText
                          : colors.grayText,
                      fontSize: 16,
                      fontWeight: '500',
                      textAlign: 'center',
                    }}
                  >
                    {day}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* end Datepicker */}
      <TouchableOpacity
        style={{
          ...styles.confirmButton,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleConfirmSelection}
      >
        <Text style={styles.confirmButtonText}>Confirm Selection</Text>
      </TouchableOpacity>
      {/* <ModalDate visible={showModal} onClose={() => setshowModal(false)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    color: 'white',
  },
  seat: {
    width: 50,
    height: 50,
    borderWidth: 1,
    // borderColor: '#BFBFBF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    color: 'white',
    // backgroundColor: '#1C1C1C',
    borderRadius: 8,
  },
  selectedSeat: {
    backgroundColor: '#FCC434',
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 60,
    marginBottom: 50,
  },
  confirmButtonText: {
    color: colors.blackText,
    fontSize: 20,
    fontWeight: '700',
  },
  seatNumber: {
    color: 'white',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectSeat;

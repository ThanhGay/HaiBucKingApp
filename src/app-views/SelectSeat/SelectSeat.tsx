import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
  import { getToday, getFormatedDate } from 'react-native-modern-datepicker';

import { Title } from '@/component/Component';
import colors from '@/utils/colors';

import { apiGetShowTimesMovie } from '@/api/movie';
import {
  apiCancelInvoice,
  apiCreateTransaction,
  apiGetReservedSeat,
} from '@/api/ticket';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setAmount,
  setInvoiceDate,
  setInvoiceId,
  setRoom,
  setSeats,
  setShowtime,
} from '@/redux/features/ticketSlice';

const typeSeat = [
  { key: 1, name: 'Available', bgColor: '#1C1C1C' },
  { key: 2, name: 'Reserved', bgColor: '#261D08' },
  { key: 3, name: 'Selected', bgColor: '#FCC434' },
];

const SelectSeat: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { token } = useAppSelector((state) => state.authState);
  const { movieId, invoiceId, room } = useAppSelector(
    (state) => state.ticketState,
  );
  const dispatch = useAppDispatch();

  // Fetch showtime of movie
  const [showtimeMovie, setShowtimeMovie] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const dataRes = await apiGetShowTimesMovie({ movieId: movieId });
      if (dataRes.status) {
        const _ = dataRes.data.map((item: any) => {
          const startTime = new Date(item.StartTime);
          const date = startTime.toISOString().split('T')[0];
          const time = startTime.toISOString().split('T')[1].substring(0, 5);
          return { date, time };
        });

        setShowtimeMovie(_);
      }
    })();
  }, [movieId]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [reserved, setReserved] = useState(true);
  const [listReserveds, setListReserveds] = useState<Array<string>>([]);
  // const listReserveds = ['A1', 'A2', 'b3', 'B5', 'c4', 'C6', 'D1', 'D3'];

  // Date
  const [activeDate, setActiveDate] = useState<string>('0');
  const [activeTime, setActiveTime] = useState(-1);
  const [selectedDate, setSelectDate] = useState<string>(getToday);

  const listTime: any[] = [];
  showtimeMovie.forEach((element) => {
    if (element.date.replaceAll('-', '/') === selectedDate) {
      listTime.push(element.time);
    }
  });

  const today = new Date();
  today.setDate(today.getDate());
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() + index);
      return {
        key: index.toString(),
        name: getFormatedDate(date, 'YYYY/MM/DD'),
      };
    });
  }, []);

  const handleDateSelection = (key: string) => {
    setActiveDate(key);
    setActiveTime(-1);
    setListReserveds([]);
    setSelectedSeats([]);
    const selectedDate = dates.find((date) => date.key === key);

    if (selectedDate) {
      setSelectDate(selectedDate.name);
    }
  };

  const handleTimeSelection = async (key: number) => {
    setActiveTime(key);
    setSelectedSeats([]);
    const chooseShow = selectedDate.replaceAll('/', '-') + ' ' + listTime[key];

    const dataRes = await apiGetReservedSeat({ startTime: chooseShow });
    if (dataRes.status) {
      const rtnData = dataRes.data;

      // const list: any[] = [];
      // _.forEach((element: any) => {
      //   list.push(element.Seat_Id);
      // });
      // setListReserveds(list);

      setListReserveds(rtnData[0].Reserved ? rtnData[0].Reserved : []);
      dispatch(setRoom(rtnData[1].Room_Id));
    }
  };

  //end
  const handleSeatSelection = (seatNumber: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      }
      setReserved(true);

      return [...prevSelectedSeats, seatNumber];
    });
  };

  const confirmWithTransaction = async () => {
    const sortedSelectedSeats = selectedSeats.sort();
    setReserved(!!sortedSelectedSeats.length);

    if (!!sortedSelectedSeats.length) {
      // Chọn ghế mới sang Payment
      const chooseShow = selectedDate + ' ' + listTime[activeTime];
      dispatch(setSeats(sortedSelectedSeats));
      dispatch(setShowtime(chooseShow));

      const dataRes = await apiCreateTransaction({
        startTime: chooseShow,
        seatId: sortedSelectedSeats,
        roomId: room,
        token,
      });

      if (dataRes.status) {
        const returnData = dataRes.data;
        dispatch(setInvoiceDate(returnData.InvoiceDate));
        dispatch(setInvoiceId(returnData.Invoice_Id));
        dispatch(setAmount(returnData.TotalAmount));
        navigation.navigate('Payment');
      }
    }
  };

  const handleBack = async () => {
    const dataRes = await apiCancelInvoice({ token, invoiceId });

    if (dataRes.status) {
      console.log('You deleted the invoice has ID: ', invoiceId);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Title leftIcon title="Select Seat" onPressLeft={handleBack} />
      <View style={{ flex: 8 }}>
        <Image
          source={require('@assets/images/movie-screen.png')}
          style={{ width: '110%', marginTop: -30, alignSelf: 'center' }}
          resizeMode="contain"
        />
        {showtimeMovie.length > 0 ? (
          <>
            <View style={styles.seatContainer}>
              {Array.from({ length: 4 }, (_, rowIndex) => {
                const rowLetter = String.fromCharCode(65 + rowIndex);
                return (
                  <View key={rowLetter} style={styles.rowContainer}>
                    {Array.from({ length: 6 }, (_, columnIndex) => {
                      const seatNumber = `${rowLetter}${columnIndex + 1}`;
                      let reserved = false;

                      if (listReserveds.includes(seatNumber)) {
                        reserved = true;
                      }
                      return (
                        <TouchableOpacity
                          key={seatNumber}
                          style={[
                            styles.seat,
                            {
                              backgroundColor: reserved ? '#271D08' : '#1C1C1C',
                            },

                            selectedSeats.includes(seatNumber) &&
                              styles.selectedSeat,
                          ]}
                          disabled={reserved}
                          onPress={() => handleSeatSelection(seatNumber)}
                        >
                          <Text
                            style={[
                              styles.seatNumber,
                              {
                                color: reserved
                                  ? colors.primary
                                  : colors.whiteText,
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
            <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
              {
                <Text style={{ color: 'red' }}>
                  {!reserved ? 'Xin vui lòng chọn ghế mà bạn mong muốn' : ''}
                </Text>
              }
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}
            >
              {typeSeat.map((item) => (
                <View
                  key={item.key}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 12,
                      backgroundColor: item.bgColor,
                      borderColor: '#BFBFBF',
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ color: colors.whiteText }}>{item.name}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <Text style={{ color: colors.whiteText, textAlign: 'center' }}>
            Tạm không có suất chiếu của phim này
          </Text>
        )}
      </View>
      {showtimeMovie.length > 0 ? (
        <>
          <View style={{ marginVertical: 16 }}>
            <Text
              style={{
                color: colors.whiteText,
                fontSize: 24,
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              Select Date & Time
            </Text>
          </View>
          <ScrollView horizontal>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 16,
                height: 60,
              }}
            >
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
                          item.key === activeDate
                            ? colors.primary
                            : colors.blackOpacity,
                        opacity: item.key === activeDate ? 1 : 0.68,

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
                          color:
                            item.key === activeDate ? colors.black : '#F2F2F2',
                          marginBottom: 12,
                        }}
                      >
                        {monthNames[month]}
                      </Text>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 40,
                          backgroundColor: '#2F2F2F',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            color:
                              item.key === activeDate
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
          </ScrollView>
          <ScrollView horizontal>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 16,
                height: 40,
              }}
            >
              {listTime.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleTimeSelection(idx)}
                >
                  <View
                    style={{
                      backgroundColor:
                        idx === activeTime
                          ? colors.primary
                          : colors.blackOpacity,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      opacity: idx === activeTime ? 1 : 0.68,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          idx === activeTime
                            ? colors.blackText
                            : colors.whiteText,
                        fontWeight: '500',
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {/* end Datepicker */}
          <TouchableOpacity
            style={{
              ...styles.confirmButton,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={confirmWithTransaction}
          >
            <Text style={styles.confirmButtonText}>Confirm Selection</Text>
          </TouchableOpacity>
        </>
      ) : null}
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    color: 'white',
    borderRadius: 8,
  },
  selectedSeat: {
    backgroundColor: '#FCC434',
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 60,
    // marginBottom: 50,
  },
  confirmButtonText: {
    color: colors.blackText,
    fontSize: 20,
    fontWeight: '700',
  },
  seatNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectSeat;

// import { Button } from '@/app-components';
// import { Title } from '@/component/Component';
// import { styles } from '@/component/styles';
// import colors from '@/utils/colors';
// import { useNavigation } from '@react-navigation/native';
// import { View, Text, Image } from 'react-native';

// function SelectSeat() {
//   const navigation = useNavigation();
//   const listSeat = [
//     { key: '01', name: 'A1', status: 0 },
//     { key: '02', name: 'A2', status: 0 },
//     { key: '03', name: 'A3', status: 0 },
//     { key: '04', name: 'A4', status: 0 },
//     { key: '05', name: 'A5', status: 1 },
//     { key: '06', name: 'A6', status: 1 },
//     { key: '07', name: 'B1', status: 1 },
//     { key: '08', name: 'B2', status: 1 },
//     { key: '09', name: 'B3', status: 0 },
//     { key: '10', name: 'B4', status: 1 },
//     { key: '11', name: 'B5', status: 0 },
//     { key: '12', name: 'B6', status: 1 },
//     { key: '13', name: 'C1', status: 0 },
//     { key: '14', name: 'C2', status: 0 },
//     { key: '15', name: 'C3', status: 1 },
//     { key: '16', name: 'C4', status: 0 },
//     { key: '17', name: 'C5', status: 0 },
//     { key: '18', name: 'C6', status: 1 },
//     { key: '19', name: 'D1', status: 1 },
//     { key: '20', name: 'D2', status: 1 },
//     { key: '21', name: 'D3', status: 1 },
//     { key: '22', name: 'D4', status: 0 },
//     { key: '23', name: 'D5', status: 0 },
//     { key: '24', name: 'D6', status: 0 },
//   ];
//   return (
//     <View style={styles.container}>
//       <Title leftIcon title="Select Seat" onPressLeft={navigation.goBack} />

//       <View style={{ flex: 8, alignItems: 'center', marginTop: -60 }}>
//         <Image
//           source={require('@assets/images/movie-screen.png')}
//           style={{ width: '105%' }}
//           resizeMode="contain"
//         />
//         <View style={{ flex: 8 }}></View>
//       </View>

//       <Button
//         title="Buy Ticket"
//         onPress={() => navigation.navigate('Payment')}
//       />
//     </View>
//   );
// }

// export default SelectSeat;

import { testAPI } from '@/api/auth';
import { Title } from '@/component/Component';
import colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SelectSeat: React.FC = () => {
  const navigation = useNavigation();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const dataRes = await testAPI();
      if (dataRes.status) {
        console.log(dataRes.data);
      }
    })();
  }, []);

  const handleSeatSelection = (seatNumber: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      }
      // console.log(seatNumber);

      return [...prevSelectedSeats, seatNumber];
    });
  };
  const handleConfirmSelection = () => {
    console.log('Selected seats:', selectedSeats);
    // navigation.navigate('Payment');
  };
  return (
    <View style={styles.container}>
      <Title leftIcon title="Select Seat" onPressLeft={navigation.goBack} />
      <View style={{ flex: 8 }}>
        <Image
          source={require('@assets/images/movie-screen.png')}
          style={{ width: '105%' }}
          resizeMode="contain"
        />
        <Text style={styles.title}>Select your seats</Text>
        <View style={styles.seatContainer}>
          {Array.from({ length: 24 }, (_, index) => index + 1).map(
            (seatNumber) => (
              <TouchableOpacity
                key={seatNumber}
                style={[
                  styles.seat,
                  selectedSeats.includes(String(seatNumber)) &&
                    styles.selectedSeat,
                ]}
                onPress={() => handleSeatSelection(String(seatNumber))}
              >
                <Text
                  style={[
                    styles.seatNumber,
                    selectedSeats.includes(String(seatNumber)) && {
                      color: colors.black,
                    },
                  ]}
                >
                  {seatNumber}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>

      <TouchableOpacity
        style={{ ...styles.confirmButton, flex: 1 }}
        onPress={handleConfirmSelection}
      >
        <Text style={styles.confirmButtonText}>Confirm Selection</Text>
      </TouchableOpacity>
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
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
  },
  selectedSeat: {
    backgroundColor: '#FCC434',
  },
  confirmButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seatNumber: {
    color: 'white', // Set default seat number color to white
  },
});

export default SelectSeat;

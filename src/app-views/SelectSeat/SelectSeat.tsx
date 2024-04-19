import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Title } from '@/component/Component';
import colors from '@/utils/colors';

const SelectSeat: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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
    navigation.navigate('Payment');
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

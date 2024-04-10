import { Button } from '@/app-components';
import { Title } from '@/component/Component';
import { styles } from '@/component/styles';
import colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';

function SelectSeat() {
  const navigation = useNavigation();
  const listSeat = [
    { key: '01', name: 'A1', status: 0 },
    { key: '02', name: 'A2', status: 0 },
    { key: '03', name: 'A3', status: 0 },
    { key: '04', name: 'A4', status: 0 },
    { key: '05', name: 'A5', status: 1 },
    { key: '06', name: 'A6', status: 1 },
    { key: '07', name: 'B1', status: 1 },
    { key: '08', name: 'B2', status: 1 },
    { key: '09', name: 'B3', status: 0 },
    { key: '10', name: 'B4', status: 1 },
    { key: '11', name: 'B5', status: 0 },
    { key: '12', name: 'B6', status: 1 },
    { key: '13', name: 'C1', status: 0 },
    { key: '14', name: 'C2', status: 0 },
    { key: '15', name: 'C3', status: 1 },
    { key: '16', name: 'C4', status: 0 },
    { key: '17', name: 'C5', status: 0 },
    { key: '18', name: 'C6', status: 1 },
    { key: '19', name: 'D1', status: 1 },
    { key: '20', name: 'D2', status: 1 },
    { key: '21', name: 'D3', status: 1 },
    { key: '22', name: 'D4', status: 0 },
    { key: '23', name: 'D5', status: 0 },
    { key: '24', name: 'D6', status: 0 },
  ];
  return (
    <View style={styles.container}>
      <Title title="Select Seat" onPressLeft={navigation.goBack} />

      <View style={{ flex: 8, alignItems: 'center', marginTop: -60 }}>
        <Image
          source={require('@assets/images/movie-screen.png')}
          style={{ width: '105%' }}
          resizeMode="contain"
        />
        <View style={{ flex: 8 }}></View>
      </View>

      <Button
        title="Buy Ticket"
        onPress={() => navigation.navigate('Payment')}
      />
    </View>
  );
}

export default SelectSeat;

import {
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import colors from '@/utils/colors';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';

function ByTime() {
  // min

  const [minDate, setMinDate] = useState('');
  const [openMinDate, setOpenMinDate] = useState(false);

  // maxx

  const [maxDate, setMaxDate] = useState('');
  const [openMaxDate, setOpenMaxDate] = useState(false);

  // Min date
  const handleChangeMinDate = (newDate: any) => {
    setMinDate(newDate);
  };
  const handleConfirmMinDate = () => {
    setOpenMinDate(!openMinDate);
    console.log('Min Date: ', minDate);
  };

  // MaxDate

  const handleChangeMaxDate = (newDate: any) => {
    setMaxDate(newDate);
  };
  const handleConfirmMaxDate = () => {
    setOpenMaxDate(!openMaxDate);
    console.log('Max Date: ', maxDate);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, color: colors.whiteText, marginTop: 20 }}>
        Report By Time
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{
            marginTop: 20,
            borderRadius: 8,
            height: 40,
            width: 120,
            borderColor: colors.primary,
            borderWidth: 1,
            justifyContent: 'center',
          }}
          onPress={() => setOpenMinDate(!openMinDate)}
        >
          <Text
            style={{
              color: colors.whiteText,
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            {!minDate ? 'Choose Date' : minDate}
          </Text>
        </TouchableOpacity>
        <ModalDate
          open={openMinDate}
          handleChange={handleChangeMinDate}
          handleComfirn={handleConfirmMinDate}
        ></ModalDate>
        <TouchableOpacity
          style={{
            //   flex: 1,
            marginTop: 20,
            borderRadius: 8,
            height: 40,
            width: 120,
            borderColor: colors.primary,
            borderWidth: 1,
            justifyContent: 'center',
          }}
          onPress={() => setOpenMaxDate(!openMaxDate)}
        >
          <Text
            style={{
              color: colors.whiteText,
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            {!maxDate ? 'Choose Date' : maxDate}
          </Text>
        </TouchableOpacity>
        <ModalDate
          open={openMaxDate}
          handleChange={handleChangeMaxDate}
          handleComfirn={handleConfirmMaxDate}
        ></ModalDate>
      </View>
      {!!minDate.length && !!maxDate.length && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            alignItems: 'baseline',
          }}
        >
          <Text
            style={{
              color: colors.whiteText,
              fontSize: 18,
              marginRight: 20,
              fontWeight: '500',
            }}
          >
            Revenue is:
          </Text>
          <Text
            style={{ color: colors.primary, fontSize: 24, fontWeight: '700' }}
          >
            500.000đ
          </Text>
        </View>
      )}
    </View>
  );
}

function ModalDate({
  open,
  handleChange,
  handleComfirn,
}: {
  open: boolean;
  handleChange(newDate: any): void;
  handleComfirn(): void;
}) {
  const max = getFormatedDate(new Date(), 'YYYY/MM/DD');

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      style={{ alignSelf: 'flex-end' }}
    >
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          gap: 10,
        }}
      >
        <DatePicker
          style={{ alignSelf: 'flex-start' }}
          mode="calendar"
          maximumDate={max}
          onDateChange={handleChange}
        />
        <TouchableOpacity
          style={{
            borderRadius: 30,
            borderColor: 'white',
            backgroundColor: colors.primary,
            paddingHorizontal: 50,
            paddingVertical: 10,
          }}
          onPress={handleComfirn}
        >
          <Text style={{ color: colors.black, fontSize: 30 }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default ByTime;

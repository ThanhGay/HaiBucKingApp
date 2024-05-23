import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { apiGetReportByRangeTime } from '@/api/admin';
import { useAppSelector } from '@/redux/hooks';
import colors from '@/utils/colors';

function ByTime() {
  const { token } = useAppSelector((state) => state.authState);
  const [revenue, setRevenue] = useState('');

  // min
  const [showMaxDate, setShowMaxDate] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [openMinDate, setOpenMinDate] = useState(false);

  // maxx

  const [maxDate, setMaxDate] = useState('');
  const [openMaxDate, setOpenMaxDate] = useState(false);

  // Min date
  const handleChangeMinDate = (newDate: any) => {
    setMinDate(newDate);
    setMaxDate('');
    setShowMaxDate(false);
  };
  const handleConfirmMinDate = () => {
    setOpenMinDate(!openMinDate);
    console.log('Min Date: ', minDate);
    if (!!minDate) {
      setShowMaxDate(true);
      setRevenue('');
    }
  };

  // MaxDate

  const handleChangeMaxDate = (newDate: any) => {
    setMaxDate(newDate);
  };
  const handleConfirmMaxDate = async () => {
    setOpenMaxDate(!openMaxDate);
    if (!!minDate && !!maxDate) {
      const dataRes = await apiGetReportByRangeTime({
        token,
        minDate,
        maxDate,
      });
      if (dataRes.status) {
        setRevenue(dataRes.data[0]?.Total ?? 0);
      }
    }
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
        {showMaxDate && (
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
        )}
        <ModalDate
          open={openMaxDate}
          handleChange={handleChangeMaxDate}
          handleComfirn={handleConfirmMaxDate}
        ></ModalDate>
      </View>
      {!!minDate.length && !!maxDate.length && !!revenue && (
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
            {revenue}
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

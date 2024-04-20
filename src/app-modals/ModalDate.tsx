import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
// import { NavigationProp } from '@react-navigation/native';

// import { Title } from '@/component/Component';
import colors from '@/utils/colors';

interface MyModalProps {
  onClose: () => void;
  visible: boolean;
}
const ModalDate: React.FC<MyModalProps> = ({ onClose, visible }) => {
  const modalRef = useRef<Modal>(null);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(getToday);

  const handleChange = (date: any) => {
    setDate(date);
  };
  const handle = () => {
    setOpen(!open);
  };
  const handleConfirm = () => {
    // setOpen(!open);
    console.log('date:', date);
    onClose();
  };
  const today = new Date();
  today.setDate(today.getDate());
  const minDate = getFormatedDate(today, 'YYYY/MM/DD');
  today.setDate(today.getDate() + 6);

  const maxDate = getFormatedDate(today, 'YYYY/MM/DD');
  return (
    <View style={styles.container}>
      <Modal
        ref={modalRef}
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
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
            mode="calendar"
            minimumDate={minDate}
            maximumDate={maxDate}
            selected={date}
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
            onPress={handleConfirm}
          >
            <Text style={{ color: colors.black, fontSize: 30 }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 50,
  },
});
export default ModalDate;

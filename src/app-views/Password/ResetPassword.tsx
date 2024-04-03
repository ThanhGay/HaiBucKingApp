import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MyModal from '../ChoseLanguage/ChoseLanguag';

export default function ResetPassword() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Optional state for modal visibility in ResetPassword

  const handleOpenModal = () => {
    setIsModalVisible(true); // Assuming you want to control visibility from ResetPassword
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Assuming you want to control visibility from ResetPassword
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleOpenModal}>
        <Text style={{ fontSize: 50 }}>123</Text>
      </TouchableOpacity>
      <MyModal
        children={<Text>Nội dung modal về Reset Password</Text>} // Customize modal content
        onClose={handleCloseModal} // Pass the handler if needed (optional)
      />
    </View>
  );
}

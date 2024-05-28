import { View, Text, Image, Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import NotificationItem from '@app-views/Home/components/NotificationItem'
import colors from '@/utils/colors'

const  ModalNotification = ({open, onClose, data}: {open: boolean, onClose?: () => void, data: any}) => {

  return (
    <Modal
visible={open}
animationType="slide"
transparent={true}
onRequestClose={onClose}
>
<View style={styles.modalContainer}>
  <ScrollView style={styles.modalContent}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={onClose}
      >
        <Image
          style={{ height: 32, width: 32 }}
          source={require('@assets/icons/back.png')}
        />
      </TouchableOpacity>
      <Text
        style={{
          flex: 8,
          color: 'white',
          fontSize: 24,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        Thông Báo
      </Text>
      <View style={{ flex: 1 }}></View>
    </View>
    <ScrollView style= {{marginTop: 12}}>
    {data.map((notification: any, index: any) => (
      
      <NotificationItem key={index} data={notification} />
      
    ))}</ScrollView>
  </ScrollView>
</View>
</Modal>
  )
}
export default ModalNotification

const styles = StyleSheet.create({
    
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: colors.black,
      borderRadius: 10,
      padding: 20,
      maxHeight: '100%',
      width: '100%',
    },
    notificationText: {
      fontSize: 16,
      marginBottom: 10,
      color: colors.whiteText,
    },
  
    closeButtonText: {
      color: colors.white,
      fontWeight: '700',
    },
    notificationIcon: {
      width: '100%',
      height: '100%',
    },
    notificationContainer: {
      position: 'relative',
      width: 36,
      height: 36,
    },
    badgeContainer: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
  
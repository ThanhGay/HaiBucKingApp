import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface MyModalProps {
  onOpen?: () => void;
}

const ChoseLanguage: React.FC<MyModalProps> = ({ onOpen }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const modalRef = useRef<Modal>(null);
  let handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const [selectEnglish, setColorEnglish] = useState(true);
  const [selectVietNam, setColorVietNam] = useState(!selectEnglish);

  const handelLanguageE = () => {
    setColorEnglish(true);
    setColorVietNam(false);
  };
  const handelLanguageV = () => {
    setColorEnglish(false);
    setColorVietNam(true);
  };

  return (
    <View style={{ backgroundColor: 'black' }}>
      <TouchableOpacity
        style={{
          borderRadius: 20,
          borderColor: 'white',
          backgroundColor: 'black',
          height: 35,
          borderWidth: 1,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        onPress={onOpen?.bind(this) || handleOpenModal}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require('@/assets/icons/translate.png')}
        />
        <Text style={{ fontSize: 16, fontWeight: '400', color: '#E6E6E6' }}>
          {selectEnglish ? 'English' : 'Việt Nam'}
        </Text>
      </TouchableOpacity>

      <Modal
        ref={modalRef}
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text
                style={{
                  fontSize: 32,
                  color: '#F2F2F2',
                  fontWeight: '700',
                  paddingTop: 32,
                }}
              >
                Choose language
              </Text>
              <Text
                style={{
                  paddingTop: 20,
                  color: '#F2F2F2',
                  fontSize: 14,
                  fontWeight: '400',
                }}
              >
                Which language do you want to use?
              </Text>
            </View>
            <TouchableOpacity
              style={{
                paddingTop: 32,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={handelLanguageE}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: selectEnglish ? '#FCC434' : '#F2F2F2',
                }}
              >
                English
              </Text>
              <Image
                source={
                  selectEnglish
                    ? require('@/assets/icons/select.png')
                    : require('@/assets/icons/noselect.png')
                }
                style={{
                  tintColor: selectEnglish ? '#FCC434' : '#F2F2F2',
                  height: 32,
                  width: 32,
                }}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                backgroundColor: '#333333',
                marginVertical: 20,
              }}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={handelLanguageV}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: selectVietNam ? '#FCC434' : '#F2F2F2',
                }}
              >
                Vietnamese
              </Text>
              <Image
                source={
                  selectVietNam
                    ? require('@/assets/icons/select.png')
                    : require('@/assets/icons/noselect.png')
                }
                style={{
                  tintColor: selectVietNam ? '#FCC434' : '#F2F2F2',
                  height: 32,
                  width: 32,
                }}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center', marginTop: 80 }}
              onPress={handleCloseModal}
            >
              <View
                style={{
                  height: 56,
                  borderRadius: 64,
                  backgroundColor: '#FCC434',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: '600', color: '#000' }}
                >
                  Use {selectVietNam ? 'Vietnamese' : 'English'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  openModalButton: {
    flexDirection: 'row',
    borderRadius: 71,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    height: 36,
    width: 95,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    paddingHorizontal: 16,
    backgroundColor: '#191919',
    width: '100%',
    height: '50%',
    borderRadius: 32, // Tùy chọn: Thêm bo tròn góc
  },
  language: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default ChoseLanguage;

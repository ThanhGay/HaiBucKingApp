import React, { useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface MyModalProps {
  onClose: () => void;
  visible: boolean;
}

interface LanguageItem {
  key: string,
  name: string;
}



const ModalLanguage: React.FC<MyModalProps> = ({ onClose, visible }) => {
  const { t, i18n } = useTranslation();
  const modalRef = useRef<Modal>(null);
  const [language, setLanguage] = useState('en');

  const mapLng:{[key: string]:LanguageItem} = useMemo(() => {
    return {
      'en': {
        key: 'en',
        name: t("language.en", 'English'),
      },
      'vi': {
        key: 'vi',
        name: t('language.vi', 'Vietnamese'),
      }
    }
  }, [])

  const handleSubmit = () => {
    console.log(language);
    i18n.changeLanguage(language)
    onClose();
  };

  return (
    <View style={{ backgroundColor: 'black' }}>
      <Modal
        ref={modalRef}
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
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
                {t('modal-language.title', 'Choose language')}
              </Text>
              <Text
                style={{
                  paddingTop: 20,
                  color: '#F2F2F2',
                  fontSize: 14,
                  fontWeight: '400',
                }}
              >
                {t(
                  'modal-language.subtitle',
                  'Which language do you want to use?',
                )}
              </Text>
            </View>
            {Object.values(mapLng).map((item) => (
              <TouchableOpacity
              key={item.key}
                style={{
                  paddingTop: 32,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                onPress={() => setLanguage(item.key)}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: item.key === language ? '#FCC434' : '#F2F2F2',
                  }}
                >
                  {item.name}
                </Text>
                <Image
                  source={
                    item.key === language
                      ? require('@/assets/icons/select.png')
                      : require('@/assets/icons/noselect.png')
                  }
                  style={{
                    tintColor: item.key === language ? '#FCC434' : '#F2F2F2',
                    height: 32,
                    width: 32,
                  }}
                />
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={{ alignItems: 'center', marginTop: 80 }}
              onPress={handleSubmit}
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
                  {t('use', 'Use')}
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

export default ModalLanguage;

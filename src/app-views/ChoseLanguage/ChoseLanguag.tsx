// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// const MyComponent: React.FC = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleOpenModal = () => {
//     setIsModalVisible(true);
//     console.log(setIsModalVisible);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//     console.log(setIsModalVisible);
//   };

//   const modalRef = useRef<Modal>(null);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleOpenModal}>
//         <Text> 1223</Text>
//       </TouchableOpacity>

//       <Modal
//         ref={modalRef}
//         visible={isModalVisible}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text>This is a modal content</Text>
//             <TouchableOpacity onPress={handleCloseModal}>
//               <Text>123</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     flex: 1, // Occupy full height
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     width: '100%',
//     height: '50%', // Set modal height to half the screen
//     borderRadius: 10, // Optional: Add rounded corners
//   },
//   screenContent: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   screenContentDimmed: {
//     opacity: 0.5, // Dim the background content
//     backgroundColor: 'black', // Optional: Set background color for dimming
//   },
// });

// export default MyComponent;

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface MyModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void; // Thuộc tính tùy chọn để kích hoạt mở modal
  onBackdropPress?: () => void;
}

const MyModal: React.FC<MyModalProps> = ({
  children,
  onClose,
  onOpen,
  onBackdropPress,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const modalRef = useRef<Modal>(null);
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <TouchableOpacity
        onPress={onOpen?.bind(this) || handleOpenModal}
        style={styles.openModalButton}
      >
        <Text>Mở Modal</Text>
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
            {children}
            <TouchableOpacity onPress={handleCloseModal}>
              <Text>Đóng Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  openModalButton: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    borderRadius: 10, // Tùy chọn: Thêm bo tròn góc
  },
});

export default MyModal;

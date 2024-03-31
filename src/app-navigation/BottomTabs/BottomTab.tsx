import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';

// export default function BottomTab() {
//   const [button1Selected, setButton1Selected] = useState(false);
//   const [button2Selected, setButton2Selected] = useState(false);
//   const [button3Selected, setButton3Selected] = useState(false);
//   const [button4Selected, setButton4Selected] = useState(false);
//   const handleButton1Press = () => {
//     setButton1Selected(true);
//     setButton2Selected(false);
//     setButton3Selected(false);
//     setButton4Selected(false);
//   };

//   const handleButton2Press = () => {
//     setButton1Selected(false);
//     setButton2Selected(true);
//     setButton3Selected(false);
//     setButton4Selected(false);
//   };
//   const handleButton3Press = () => {
//     setButton1Selected(false);
//     setButton2Selected(false);
//     setButton3Selected(true);
//     setButton4Selected(false);
//   };
//   const handleButton4Press = () => {
//     setButton1Selected(false);
//     setButton2Selected(false);
//     setButton3Selected(false);
//     setButton4Selected(true);
//   };
//   return (
//     <View style={{ flexDirection: 'row', height: 80 }}>
//       <TouchableOpacity
//         style={{
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flex: 1,
//           backgroundColor: 'black', // Change color based on state
//           padding: 10,
//         }}
//         onPress={handleButton1Press}
//       >
//         <Image
//           source={require('@/assets/icons/translate.png')}
//           style={{ height: 28, width: 28 }}
//         />
//         <Text
//           style={{
//             fontSize: 12,
//             fontWeight: '700',
//             color: button1Selected ? '#FCC435' : '#CCCCCC',
//             paddingTop: 12,
//           }}
//         >
//           Home
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flex: 1,
//           backgroundColor: 'black', // Change color based on state
//           padding: 10,
//         }}
//         onPress={handleButton2Press}
//       >
//         <Image
//           source={require('@/assets/icons/translate.png')}
//           style={{ height: 28, width: 28 }}
//         />
//         <Text
//           style={{
//             fontSize: 12,
//             fontWeight: '700',
//             color: button2Selected ? '#FCC435' : '#CCCCCC',
//             paddingTop: 12,
//           }}
//         >
//           Ticket
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flex: 1,
//           backgroundColor: 'black', // Change color based on state
//           padding: 10,
//         }}
//         onPress={handleButton3Press}
//       >
//         <Image
//           source={require('@/assets/icons/translate.png')}
//           style={{ height: 28, width: 28 }}
//         />
//         <Text
//           style={{
//             fontSize: 12,
//             fontWeight: '700',
//             color: button3Selected ? '#FCC435' : '#CCCCCC',
//             paddingTop: 12,
//           }}
//         >
//           Movie
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flex: 1,
//           backgroundColor: 'black', // Change color based on state
//           padding: 10,
//         }}
//         onPress={handleButton4Press}
//       >
//         <Image
//           source={require('@/assets/icons/translate.png')}
//           style={{ height: 28, width: 28 }}
//         />
//         <Text
//           style={{
//             fontSize: 12,
//             fontWeight: '700',
//             color: button4Selected ? '#FCC435' : '#CCCCCC',
//             paddingTop: 12,
//           }}
//         >
//           Profile
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

export const ButtonTab = ({
  icon,
  text,
  select,
  handle,
}: {
  icon: any;
  text: any;
  select: boolean;
  handle: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
      }}
      onPress={handle}
    >
      <Image source={icon} style={{ height: 28, width: 28 }} />
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: select ? '#FCC435' : '#CCCCCC',
          paddingTop: 12,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default function BottomTab() {
  const [button1Selected, setButton1Selected] = useState(false);
  const [button2Selected, setButton2Selected] = useState(false);
  const [button3Selected, setButton3Selected] = useState(false);
  const [button4Selected, setButton4Selected] = useState(false);
  const handleButton1Press = () => {
    setButton1Selected(true);
    setButton2Selected(false);
    setButton3Selected(false);
    setButton4Selected(false);
  };

  const handleButton2Press = () => {
    setButton1Selected(false);
    setButton2Selected(true);
    setButton3Selected(false);
    setButton4Selected(false);
  };
  const handleButton3Press = () => {
    setButton1Selected(false);
    setButton2Selected(false);
    setButton3Selected(true);
    setButton4Selected(false);
  };
  const handleButton4Press = () => {
    setButton1Selected(false);
    setButton2Selected(false);
    setButton3Selected(false);
    setButton4Selected(true);
  };
  return (
    <View style={{ flexDirection: 'row', height: 80 }}>
      <ButtonTab
        icon={require('@/assets/icons/translate.png')}
        text={'Home'}
        select={button1Selected}
        handle={handleButton1Press}
      />
      <ButtonTab
        icon={require('@/assets/icons/translate.png')}
        text={'Ticket'}
        select={button2Selected}
        handle={handleButton2Press}
      />
      <ButtonTab
        icon={require('@/assets/icons/translate.png')}
        text={'Movie'}
        select={button3Selected}
        handle={handleButton3Press}
      />
      <ButtonTab
        icon={require('@/assets/icons/translate.png')}
        text={'Profile'}
        select={button4Selected}
        handle={handleButton4Press}
      />
    </View>
  );
}

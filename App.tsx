// import RootComponent from "@app-views/RootComponent"
// import NavigationContainer from "@app-navigation/NavigationContainer"

// const App = () => {
//   return (
//     <RootComponent>
//       <NavigationContainer />
//     </RootComponent>
//   )
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { View, Image, Animated, Linking, Button } from 'react-native';

// const fallDownAnimation = (position: Animated.ValueXY) => {
//   return Animated.timing(position, {
//     toValue: { x: 30, y: 400 }, // Vị trí cuối cùng
//     duration: 1000, // Thời gian animation
//     useNativeDriver: true, // Sử dụng driver gốc
//   });
// };

// const moveLeftAnimation = (position: Animated.ValueXY) => {
//   return Animated.timing(position, {
//     toValue: { x: 35, y: 400 }, // Vị trí cuối cùng
//     duration: 1000, // Thời gian animation
//     useNativeDriver: true, // Sử dụng driver gốc
//   });
// };
// const App = () => {
//   const [position1] = useState(new Animated.ValueXY({ x: 0, y: -300 })); // Vị trí ban đầu ảnh 1
//   const [position2] = useState(new Animated.ValueXY({ x: 500, y: 400 })); // Vị trí ban đầu ảnh 2
//   useEffect(() => {
//     fallDownAnimation(position1).start(); // Khởi tạo animation rơi xuống cho ảnh 1
//   }, []);

//   useEffect(() => {
//     moveLeftAnimation(position2).start(); // Khởi tạo animation di chuyển sang trái cho ảnh 2
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: 'black', flexDirection: 'row' }}>
//       <Animated.View
//         style={{
//           transform: [{ translateX: position1.x }, { translateY: position1.y }],
//         }}
//       >
//         <Image source={require('@/assets/logo/Hai.png')} />
//       </Animated.View>
//       <Animated.View
//         style={{
//           transform: [{ translateX: position2.x }, { translateY: position2.y }],
//         }}
//       >
//         <Image source={require('@/assets/logo/BucKing.png')} />
//       </Animated.View>
//     </View>
//   );
// };
// export default App;
import { View, Text } from 'react-native';
import React from 'react';
import { SplashScreen } from '@/app-views/Splash/Splash';
import FirstScreen from '@/app-views/FirstScreen/FirstScreen';
import BottomTab from '@/app-navigation/BottomTabs/BottomTab';

export default function App() {
  return <BottomTab />;
}

import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
// import {useSpring as MySpring} from 'react-spring';

export default function Splash() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <Image
        source={require('/Users/mac/Desktop/DoAnDNT/HaiBucKingApp/src/assets/images/movie-1.png')}
      />
      <ActivityIndicator style={{ paddingTop: 50 }} color={'green'} size={35} />
    </View>
    //   const {x, y, scale, rotate} = MySpring({
    //     from: {x: 0, y: 0, scale: 0, rotate: 0},
    //     to: {x: 0, y: 0, scale: 1, rotate: 360},
    //     config: {duration: 1000},
    //   });

    //   return (
    //     <View>
    //       <Image
    //         style={{
    //           transform: `translate(${x}, ${y}) scale(${scale}) rotate(${rotate}deg)`,
    //         }}
    //         source={require('../../Images/Logo/Logo-L.png')}
    //         alt="Your logo"
    //       />
    // </View>
  );
}

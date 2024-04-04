import { View, ActivityIndicator, Image, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import FirstScreen from '../FirstScreen/FirstScreen';
import { NavigationProp } from '@react-navigation/native';

const fallDownAnimation = (position: Animated.ValueXY) => {
  return Animated.timing(position, {
    toValue: { x: 30, y: 400 }, // Vị trí cuối cùng
    duration: 1500, // Thời gian animation
    useNativeDriver: true, // Sử dụng driver gốc
  });
};

const moveLeftAnimation = (position: Animated.ValueXY) => {
  return Animated.timing(position, {
    toValue: { x: 35, y: 400 }, // Vị trí cuối cùng
    duration: 1500, // Thời gian animation
    useNativeDriver: true, // Sử dụng driver gốc
  });
};

const Animation = () => {
  const [position1] = useState(new Animated.ValueXY({ x: 0, y: -300 })); // Vị trí ban đầu ảnh 1
  const [position2] = useState(new Animated.ValueXY({ x: 500, y: 400 })); // Vị trí ban đầu ảnh 2
  useEffect(() => {
    fallDownAnimation(position1).start(); // Khởi tạo animation rơi xuống cho ảnh 1
  }, []);

  useEffect(() => {
    moveLeftAnimation(position2).start(); // Khởi tạo animation di chuyển sang trái cho ảnh 2
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flexDirection: 'row',
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateX: position1.x }, { translateY: position1.y }],
        }}
      >
        <Image source={require('@/assets/logo/Hai.png')} />
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateX: position2.x }, { translateY: position2.y }],
        }}
      >
        <Image source={require('@/assets/logo/BucKing.png')} />
      </Animated.View>
    </View>
  );
};
const Splash: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 2222);
    return () => clearTimeout(timeout);
  }, []);
  return isShowSplash ? (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={require('@/assets/images/movie-3.png')}
    >
      <Animation />
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </ImageBackground>
  ) : (
    <FirstScreen navigation={navigation} />
  );
};

export default Splash;

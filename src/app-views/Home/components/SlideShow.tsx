import MovieItem from '@/app-views/Movie/components/MovieItem';
import colors from '@/utils/colors';
import { convertTime1 } from '@/utils/hooks';
import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Text,
} from 'react-native';

const SlideShow = ({ images }: { images: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        const { dx } = gestureState;
        return Math.abs(dx) > 10; // Chỉ bắt đầu xử lý vuốt nếu vuốt lớn hơn 10px
      },
      onPanResponderMove: (event, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 50) {
          handlePrevious();
        } else if (gestureState.dx < -50) {
          handleNext();
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {currentIndex > 0 && (
        <TouchableOpacity
          onPress={handlePrevious}
          style={{ position: 'absolute', left: 0 }}
        >
          <Image
            source={images[currentIndex - 1].poster}
            style={{ height: 345, width: 20, opacity: 0.75 }}
          />
        </TouchableOpacity>
      )}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: pan.x }],
        }}
      >
        <Image
          source={images[currentIndex].poster}
          style={{ height: 440, width: 310 }}
        />
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{ color: colors.whiteText, fontSize: 24, fontWeight: '700' }}
          >
            {images[currentIndex].name}
          </Text>
          <Text style={{ color: colors.grayText, fontSize: 16, marginTop: 6 }}>
            {convertTime1(images[currentIndex].duration)} -{' '}
            {images[currentIndex].category}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Image
              style={{ height: 16, width: 16 }}
              source={require('@assets/icons/star.png')}
            />
            <Text
              style={{
                color: colors.whiteText,
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              {'  '}
              {images[currentIndex].star}
            </Text>
            <Text style={{ color: colors.grayText, fontSize: 12 }}>
              {' '}
              ({images[currentIndex].totalRate})
            </Text>
          </View>
        </View>
      </Animated.View>
      {currentIndex < images.length - 1 && (
        <TouchableOpacity
          onPress={handleNext}
          style={{ position: 'absolute', right: 0 }}
        >
          <Image
            source={images[currentIndex + 1].poster}
            style={{ height: 345, width: 20, opacity: 0.75 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SlideShow;

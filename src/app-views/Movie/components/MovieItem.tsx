import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '@/utils/colors';
import { convertTime } from '@/utils/hooks';
import { CameraIcon, ClockIcon, StarIcon } from '@/app-uikits/icon';
import { useNavigation } from '@react-navigation/native';

const MovieItem = ({
  film,
  direction,
}: {
  film?: any;
  direction: 'column' | 'row';
}) => {
  const navigation = useNavigation();
  const seeDetail = () => {
    navigation.navigate('DetailMovie');
  };
  const basicInfo = [
    {
      key: 1,
      name: 'rate',
      icon: require('@assets/icons/star.png'),
      value: `${film?.star} (${film?.totalRate})`,
    },
    {
      key: 2,
      name: 'duration',
      icon: require('@assets/icons/clock-white.png'),
      value: convertTime(film?.duration),
    },
    {
      key: 3,
      name: 'category',
      icon: require('@assets/icons/camera-white.png'),
      value: film?.category,
    },
  ];
  return (
    <TouchableOpacity
      style={{
        width: direction === 'column' ? 190 : '100%',
        height: direction === 'column' ? 385 : 140,
        flexDirection: direction,
        gap: direction === 'column' ? 0 : 8,
        backgroundColor:
          direction === 'column' ? colors.black : colors.blackOpacity,
        borderRadius: direction === 'column' ? 0 : 16,
      }}
      onPress={direction === 'column' ? seeDetail : () => void {}}
    >
      <Image
        style={{
          ...styles.image,
          width: direction === 'column' ? 190 : 100,
          height: direction === 'column' ? 265 : 140,
        }}
        source={film.poster}
      />
      <View style={{ justifyContent: 'center' }}>
        <Text
          style={{
            ...styles.title,
            marginBottom: direction === 'column' ? 0 : 16,
            fontSize: direction === 'column' ? 16 : 20,
          }}
        >
          {film?.name}
        </Text>
        <View>
          <View style={{ gap: direction === 'column' ? 2 : 8 }}>
            {basicInfo.map((item) => (
              <View
                key={item.key}
                style={{ flexDirection: 'row', marginVertical: 2 }}
              >
                <Image
                  style={styles.icon}
                  source={item.icon}
                  alt={item.name}
                />
                <Text style={styles.text}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontWeight: '700',
    color: colors.primary,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.whiteText,
  },
});

export default MovieItem;

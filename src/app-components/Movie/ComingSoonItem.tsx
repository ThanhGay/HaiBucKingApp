import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import colors from '@/utils/colors';

interface ComingSoonItemProps {
  film?: any;
}

const ComingSoonItem: React.FC<
  ComingSoonItemProps & { navigation: NavigationProp<any> }
> = ({ navigation, film }) => {
  const seeDetail = () => {
    navigation.navigate('DetailMovie', { movieId: film.Movie_Id });
  };
  const basicInfo = [
    {
      key: 1,
      name: 'rate',
      icon: require('@assets/icons/calendar-white.png'),
      value: film?.Release.slice(0, 10),
    },
    {
      key: 2,
      name: 'category',
      icon: require('@assets/icons/camera-white.png'),
      value: film?.Categories,
    },
  ];
  return (
    <TouchableOpacity
      style={{
        width: 190,
        height: 385,
        flexDirection: 'column',
        backgroundColor: colors.black,
      }}
      onPress={seeDetail}
    >
      <Image
        style={{
          ...styles.image,
          width: 190,
          height: 265,
        }}
        source={
          film?.Poster
            ? { uri: film?.Poster }
            : require('@assets/images/movie-1.png')
        }
      />
      <View style={{ justifyContent: 'center' }}>
        <Text
          style={{
            ...styles.title,
            fontSize: 16,
          }}
        >
          {film?.Movie_Name}
        </Text>
        <View>
          <View style={{ gap: 2 }}>
            {basicInfo.map((item) => (
              <View
                key={item.key}
                style={{ flexDirection: 'row', marginVertical: 2 }}
              >
                <Image style={styles.icon} source={item.icon} alt={item.name} />
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

export default ComingSoonItem;

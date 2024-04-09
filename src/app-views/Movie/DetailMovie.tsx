import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '@/utils/colors';
import Avatar_Name from '@/app-components/Avatar_Name';
import { Button } from '@/app-components';
import { useNavigation } from '@react-navigation/native';

function DetailMovie() {
  const infomationData = [
    {
      name: 'Movie genre',
      value: 'Action, Adventure, Sci-fi',
    },
    {
      name: 'Censorship',
      value: '13+',
    },
    {
      name: 'Language',
      value: 'English',
    },
  ];
  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.black }}>
      {/* <View style={{  }}> */}
      <ImageBackground
        source={require('@assets/images/movie-6.png')}
        style={{ width: '100%', height: 240 }}
      >
        <View style={styles.backbar}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require('@/assets/icons/back.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.infomationBox}>
        <BubbleBox />
        <View style={{ gap: 12 }}>
          {infomationData.map((item) => (
            <View
              key={item.name}
              style={{ alignItems: 'center', flexDirection: 'row' }}
            >
              <Text
                style={{
                  color: colors.grayText,
                  fontSize: 16,
                  width: '40%',
                }}
              >
                {item.name}:
              </Text>
              <Text
                style={{
                  color: colors.whiteText,
                  fontSize: 16,
                  fontWeight: '700',
                }}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        <Storyline />

        <Directors />

        <Actors />

        <Button
          title="Booking"
          onPress={() => navigation.navigate('SelectSeat')}
        />
      </View>
    </ScrollView>
  );
}

const BubbleBox = () => {
  return (
    <View style={styles.box}>
      <View style={{ gap: 12 }}>
        <Text style={styles.name}>Avengers: Infinity War</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.whiteText }}>2h29m</Text>
          <View style={styles.dot} />
          <Text style={{ color: colors.whiteText }}>16.12.2022</Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: colors.whiteText,
                fontWeight: '700',
                fontSize: 16,
              }}
            >
              Review
            </Text>
            <Image
              source={require('@assets/icons/star.png')}
              alt="star"
              style={{
                width: 16,
                height: 16,
                marginLeft: 8,
                marginRight: 4,
              }}
            />
            <Text
              style={{
                color: colors.whiteText,
                fontWeight: '700',
                fontSize: 16,
                marginRight: 2,
              }}
            >
              4.8
            </Text>
            <Text style={{ fontSize: 12, color: colors.whiteText }}>
              (1222)
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <View style={{ gap: 12, flexDirection: 'row' }}>
              <Image
                source={require('@assets/images/movie-2.png')}
                alt="star"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Image
                source={require('@assets/images/movie-2.png')}
                alt="star"
                style={{ width: 24, height: 24 }}
              />
              <Image
                source={require('@assets/images/movie-2.png')}
                alt="star"
                style={{ width: 24, height: 24 }}
              />
              <Image
                source={require('@assets/images/movie-2.png')}
                alt="star"
                style={{ width: 24, height: 24 }}
              />
              <Image
                source={require('@assets/images/movie-2.png')}
                alt="star"
                style={{ width: 24, height: 24 }}
              />
            </View>

            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: colors.grayText,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 4,
              }}
            >
              <Image
                source={require('@assets/icons/play.png')}
                alt="star"
                style={{ width: 16, height: 16, marginRight: 4 }}
              />
              <Text style={{ color: colors.grayText }}>Watch trailer</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Storyline = () => {
  const [seeAll, setSeeAll] = useState(false);
  return (
    <View>
      <Text style={styles.title}>Storyline</Text>
      <Text
        numberOfLines={seeAll ? 100 : 3}
        style={{ marginTop: 12, color: colors.whiteText }}
      >
        As the Avengers and their allies have continued to protect the world
        from threats too large for any one hero to handle, a new danger has
        emerged from the cosmic shadows: Thanos
        akjsdlfjaslkdf;lasdjflkasa;sldfj;alsdjfkas asdkjflascdknasd
        asdjflkasdfknas;dasklf
      </Text>
      {!seeAll && (
        <TouchableOpacity onPress={() => setSeeAll(true)}>
          <Text style={{ color: colors.primary, fontWeight: '700' }}>
            See more
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Directors = () => {
  const data = [
    {
      key: 1,
      image: '@assets/images/movie-3.png',
      firstname: 'Althony',
      lastname: 'Russop',
    },
    {
      key: 2,
      image: '@assets/images/movie-3.png',
      firstname: 'Joe',
      lastname: 'Russop',
    },
  ];

  return (
    <View>
      <Text style={styles.title}>Director</Text>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        {data.map((item) => (
          <Avatar_Name
            key={item.key}
            firstname={item.firstname}
            lastname={item.lastname}
          />
        ))}
      </View>
    </View>
  );
};

const Actors = () => {
  const data = [
    {
      key: 1,
      firstname: 'Robert',
      lastname: 'Downey Jr.',
    },
    {
      key: 2,
      firstname: 'Chris',
      lastname: 'Hemsworth',
    },
    {
      key: 3,
      firstname: 'Chris',
      lastname: 'Evan',
    },
  ];

  return (
    <View>
      <Text style={styles.title}>Actor</Text>
      <ScrollView horizontal>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {data.map((item) => (
            <Avatar_Name
              key={item.key}
              firstname={item.firstname}
              lastname={item.lastname}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backbar: { top: 40, paddingHorizontal: 16 },
  box: {
    backgroundColor: colors.blackOpacity,
    borderRadius: 16,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.whiteText,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: colors.whiteText,
    marginHorizontal: 4,
  },
  infomationBox: {
    top: -120,
    paddingHorizontal: 16,
    gap: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.whiteText,
  },
});

export default DetailMovie;

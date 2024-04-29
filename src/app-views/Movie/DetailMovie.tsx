import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setInvoiceId, setMovieId } from '@/redux/feature/ticketSlice';
import { apiDetailMovie } from '@/api/movie';

import { Button, Avatar_Name } from '@app-components';
import colors from '@/utils/colors';
import { convertTime, formatDate, transformDataMovie } from '@/utils/hooks';
import { apiCreateInvoice } from '@/api/ticket';

interface DetailMovieProps {
  route: any;
}

const DetailMovie: React.FC<
  DetailMovieProps & { navigation: NavigationProp<any> }
> = ({ navigation, route }) => {
  const movieId = route.params.movieId;
  const { token } = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  const [dataMovieFormated, setDataMovieFormated] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const dataRes = await apiDetailMovie({ movieId: 'MV0002' });
      if (dataRes.status) {
        setDataMovieFormated(transformDataMovie(dataRes.data));
      }
    })();
  }, [movieId]);

  const infomationData = [
    {
      name: 'Movie genre',
      value: dataMovieFormated?.Categories,
    },
    {
      name: 'Censorship',
      value: `${dataMovieFormated?.Censorship}+`,
    },
    {
      name: 'Language',
      value: dataMovieFormated?.Language,
    },
  ];

  const handleBooking = async () => {
    dispatch(setMovieId(movieId));

    const dataRes = await apiCreateInvoice({ token });
    if (dataRes.status) {
      dispatch(setInvoiceId(dataRes.data[0].NewInvoiceId));
    }

    console.log('You are booking the movie has ID: ', movieId);
    navigation.navigate('SelectSeat');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.black }}>
      <ImageBackground
        source={
          dataMovieFormated?.Poster
            ? { uri: dataMovieFormated?.Poster }
            : require('@assets/images/movie-6.png')
        }
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
        <BubbleBox
          name={dataMovieFormated?.Movie_Name}
          duration={dataMovieFormated?.Duration}
          release={dataMovieFormated?.Release}
        />
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

        <Storyline description={dataMovieFormated?.Description} />

        <Directors
          listDirector={dataMovieFormated?.Director}
          listImg={dataMovieFormated?.imageDirector}
        />

        <Actors
          listActor={dataMovieFormated?.Actor}
          listImg={dataMovieFormated?.imageActor}
        />

        <Button title="Booking" onPress={handleBooking} />
      </View>
    </ScrollView>
  );
};

const BubbleBox = ({
  name,
  duration,
  release,
}: {
  name: any;
  duration: any;
  release: any;
}) => {
  return (
    <View style={styles.box}>
      <View style={{ gap: 12 }}>
        <Text style={styles.name}>{name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.whiteText }}>
            {convertTime(duration as number)}
          </Text>
          <View style={styles.dot} />
          <Text style={{ color: colors.whiteText }}>{formatDate(release)}</Text>
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
                source={require('@assets/icons/star.png')}
                alt="star"
                style={{ width: 24, height: 24 }}
              />
              <Image
                source={require('@assets/icons/star.png')}
                alt="star"
                style={{ width: 24, height: 24 }}
              />
              <Image
                source={require('@assets/icons/star.png')}
                alt="star"
                style={{ width: 24, height: 24 }}
              />
              <Image
                source={require('@assets/icons/star.png')}
                alt="star"
                style={{ width: 24, height: 24 }}
              />
              <Image
                source={require('@assets/icons/star.png')}
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
                gap: 8,
              }}
            >
              <Image
                source={require('@assets/icons/play.png')}
                alt="star"
                style={{ width: 16, height: 16 }}
              />
              <Text style={{ color: colors.grayText }}>Watch trailer</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Storyline = ({ description }: { description: any }) => {
  const [seeAll, setSeeAll] = useState(false);
  return (
    <View>
      <Text style={styles.title}>Storyline</Text>
      <Text
        numberOfLines={seeAll ? 100 : 3}
        style={{ marginTop: 12, color: colors.whiteText }}
      >
        {description}
      </Text>

      <TouchableOpacity onPress={() => setSeeAll(!seeAll)}>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>
          {!seeAll ? 'See more' : 'Hide less'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Directors = ({
  listDirector,
  listImg,
}: {
  listDirector: any;
  listImg: any;
}) => {
  const data =
    listDirector > 0
      ? listDirector.map((item: any, idx: number) => {
          return {
            key: idx,
            name: item,
            image: listImg[idx],
          };
        })
      : [];

  return (
    <View>
      <Text style={styles.title}>Director</Text>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        {data.map((item: any) => (
          <Avatar_Name key={item.key} name={item.name} image={item.image} />
        ))}
      </View>
    </View>
  );
};

const Actors = ({ listActor, listImg }: { listActor: any; listImg: any }) => {
  const data =
    listActor > 0
      ? listActor.map((item: any, idx: number) => {
          return {
            key: idx,
            name: item,
            image: listImg[idx],
          };
        })
      : [];

  return (
    <View>
      <Text style={styles.title}>Actor</Text>
      <ScrollView horizontal>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {data.map((item: any) => (
            <Avatar_Name key={item.key} name={item.name} image={item.image} />
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

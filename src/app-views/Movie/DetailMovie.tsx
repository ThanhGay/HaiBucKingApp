import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setDuration,
  setMovieCategories,
  setMovieId,
  setMovieName,
  setMoviePoster,
} from '@/redux/features/ticketSlice';

import { Button, Avatar_Name } from '@app-components';
import colors from '@/utils/colors';
import { convertTime } from '@/utils/hooks';
import { ActivityIndicator } from 'react-native';

interface DetailMovieProps {
  route: any;
}

const DetailMovie: React.FC<
  DetailMovieProps & { navigation: NavigationProp<any> }
> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const movieId = route.params.movieId;
  const { detailMovie, isLoading, listShowTimesMovie, isLoadSchedule } =
    useAppSelector((state) => state.movieState);
  const dispatch = useAppDispatch();

  const infomationData = [
    {
      name: t('movie.detail.genre', 'Movie genre'),
      value: detailMovie?.Categories,
    },
    {
      name: t('movie.detail.censorship', 'Censorship'),
      value: `${detailMovie?.Censorship}+`,
    },
    {
      name: t('movie.detail.language', 'Language'),
      value: detailMovie?.Language,
    },
  ];

  const handleBooking = async () => {
    dispatch(setMovieId(detailMovie?.Movie_Id));
    dispatch(setMovieName(detailMovie?.Movie_Name));
    dispatch(setMovieCategories(detailMovie?.Categories));
    dispatch(setMoviePoster(detailMovie?.Poster));
    dispatch(setDuration(detailMovie?.Duration));

    console.log('You are booking the movie has ID: ', movieId);
    navigation.navigate('SelectSeat');
  };
  return (
    <>
      {isLoading || isLoadSchedule ? (
        <ActivityIndicator
          style={{ height: '100%' }}
          size={'large'}
          color={'black'}
        />
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: colors.black }}>
          <ImageBackground
            source={
              detailMovie?.Poster
                ? { uri: detailMovie?.Poster }
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
              name={detailMovie?.Movie_Name}
              duration={detailMovie?.Duration}
              release={detailMovie?.Release}
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

            <Storyline description={detailMovie?.Description} />

            <Directors listDirector={detailMovie?.directors} />
            <Actors listActor={detailMovie?.actors} />

            <Button
              title={t('movie.detail.submit-btn', 'Booking')}
              onPress={handleBooking}
              disabled={listShowTimesMovie.length < 1}
            />
          </View>
        </ScrollView>
      )}
    </>
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
  const { t } = useTranslation();
  return (
    <View style={styles.box}>
      <View style={{ gap: 12 }}>
        <Text style={styles.name}>{name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.whiteText }}>
            {convertTime(duration as number)}
          </Text>
          <View style={styles.dot} />
          <Text style={{ color: colors.whiteText }}>{release}</Text>
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
              {t('movie.detail.review', 'Review')}
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
              <Text style={{ color: colors.grayText }}>
                {t('movie.detail.watch-traler', 'Watch trailer')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Storyline = ({ description }: { description: any }) => {
  const { t } = useTranslation();
  const [seeAll, setSeeAll] = useState(false);
  return (
    <View>
      <Text style={styles.title}>
        {t('movie.detail.storyline', 'Storyline')}
      </Text>
      <Text
        numberOfLines={seeAll ? 100 : 3}
        style={{ marginTop: 12, color: colors.whiteText }}
      >
        {description}
      </Text>

      <TouchableOpacity onPress={() => setSeeAll(!seeAll)}>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>
          {!seeAll
            ? t('movie.detail.see', 'See more')
            : t('movie.detail.hide', 'Hide less')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Directors = ({ listDirector }: { listDirector: any }) => {
  const { t } = useTranslation();
  const data =
    listDirector.length > 0
      ? listDirector.map((item: any, idx: number) => {
          return {
            key: idx,
            name: item,
          };
        })
      : [];

  return (
    <View>
      <Text style={styles.title}>{t('movie.detail.director', 'Director')}</Text>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        {data.length > 0 ? (
          data.map((item: any) => (
            <Avatar_Name key={item.key} name={item.name} image={item.image} />
          ))
        ) : (
          <Text style={{ color: 'white' }}>{t('update', 'Updating...')}</Text>
        )}
      </View>
    </View>
  );
};

const Actors = ({ listActor }: { listActor: any }) => {
  const { t } = useTranslation();
  const data =
    listActor.length > 0
      ? listActor.map((item: any, idx: number) => {
          return {
            key: idx,
            name: item,
          };
        })
      : [];

  return (
    <View>
      <Text style={styles.title}>{t('movie.detail.actor', 'Actor')}</Text>
      <ScrollView horizontal>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {data.length > 0 ? (
            data.map((item: any) => (
              <Avatar_Name key={item.key} name={item.name} image={item.image} />
            ))
          ) : (
            <Text style={{ color: 'white' }}>{t('update', 'Updating...')}</Text>
          )}
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

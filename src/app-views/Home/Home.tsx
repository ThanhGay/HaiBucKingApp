import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { useAppSelector } from '@/redux/hooks';
import { ComingSoonItem } from '@app-components/Movie';

import SearchBox from '@app-components/SearchBox';
import BottomTab from '@app-navigation/BottomTabs/BottomTab';
import NewsItem from './components/NewsItem';
import SlideShow from './components/SlideShow';
import ContentBox from './components/ContentBox';
import colors from '@/utils/colors';

const listNews = [
  {
    key: 1,
    image: require('@assets/images/news-1.png'),
    title: 'When The Batman 2 Starts Filming Reportedly Revealed',
  },
  {
    key: 2,
    image: require('@assets/images/news-2.png'),
    title: "6 Epic Hulk Fights That Can Happen In The MCU's Future ",
  },
];

const Home: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { user, token } = useAppSelector((state) => state.authState);
  const { listNowPlaying, listComingSoon, isLoading } = useAppSelector(
    (state) => state.movieState,
  );

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          style={{ height: '100%' }}
          size={'large'}
          color={'black'}
        />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ flex: 9 }}>
              <View>
                <View style={styles.header}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text
                      style={{
                        color: colors.whiteText,
                        fontSize: 18,
                      }}
                    >
                      {t('home.hi', 'Hi')}, {user?.FullName}
                    </Text>
                    <Text style={styles.boldTitle}>
                      {t('home.welcome', 'Welcome back')}
                    </Text>
                  </View>
                  <Image
                    source={require('@assets/icons/notification.png')}
                    style={{ width: 36, height: 36 }}
                  />
                  {/* <Badge /> */}
                </View>
                <ScrollView>
                  <View style={{ gap: 16 }}>
                    <View>
                      <ContentBox
                        title={t('home.title.part-1', 'Now playing')}
                        onPress={() => navigation.navigate('Movie')}
                      />
                      <View>
                        {/* Image boxer */}

                        <SlideShow list={listNowPlaying} />
                      </View>
                    </View>

                    <View>
                      <ContentBox
                        title={t('home.title.part-2', 'Coming soon')}
                        onPress={() => navigation.navigate('Movie', { key: 2 })}
                      />
                      <ScrollView horizontal>
                        {listComingSoon.map((movie) => (
                          <View
                            key={movie.Movie_Id}
                            style={{
                              paddingHorizontal: 8,
                            }}
                          >
                            <ComingSoonItem
                              film={movie}
                              navigation={navigation}
                            />
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
          <BottomTab />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  boldTitle: {
    color: colors.whiteText,
    fontWeight: '700',
    fontSize: 26,
  },
});

export default Home;

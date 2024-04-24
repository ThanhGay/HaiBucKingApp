import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { useAppSelector } from '@/redux/hooks';
import { ComingSoonItem } from '@app-components/Movie';

import SearchBox from '@app-components/SearchBox';
import BottomTab from '@app-navigation/BottomTabs/BottomTab';
import NewsItem from './components/NewsItem';
import SlideShow from './components/SlideShow';
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
  const { user } = useAppSelector((state) => state.authState);
  const { listNowPlaying, listComingSoon } = useAppSelector(
    (state) => state.userState,
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 9 }}>
          <View>
            <View style={styles.header}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: colors.whiteText, fontSize: 18 }}>
                  Hi, {user.FullName}
                </Text>
                <Text style={styles.boldTitle}>Welcome back</Text>
              </View>
              <Image
                source={require('@assets/icons/notification.png')}
                style={{ width: 36, height: 36 }}
              />
              {/* <Badge /> */}
            </View>
            <SearchBox />
            <ScrollView>
              <View style={{ gap: 16 }}>
                <View>
                  <ContentBox
                    title="Now playing"
                    onPress={() => navigation.navigate('Movie')}
                  />
                  <View>
                    {/* Image boxer */}

                    <SlideShow list={listNowPlaying} />
                  </View>
                </View>

                <View>
                  <ContentBox
                    title="Coming soon"
                    onPress={() => navigation.navigate('Movie', { key: 2 })}
                  />
                  <ScrollView horizontal>
                    {listComingSoon.map((movie) => (
                      <View
                        key={movie.Movie_Id}
                        style={{ paddingHorizontal: 8 }}
                      >
                        <ComingSoonItem film={movie} />
                      </View>
                    ))}
                  </ScrollView>
                </View>

                <View>
                  <ContentBox title="Movie News" />
                  <ScrollView horizontal>
                    {listNews.map((item) => (
                      <View
                        key={item.key}
                        style={{ paddingHorizontal: 8, marginVertical: 24 }}
                      >
                        <NewsItem post={item} />
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
  );
};

const ContentBox = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}
    >
      <Text style={styles.boldTitle}>{title}</Text>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          gap: 4,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        <Text style={{ color: colors.primary }}>See all</Text>
        <Image
          source={require('@assets/icons/right.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
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
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: colors.primary,
  },
});

export default Home;

import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { MovieItem } from '@app-components/Movie';
import SearchBox from '@app-components/SearchBox';
import colors from '@/utils/colors';
import { getNowPlaying } from '@/redux/features/movieSlice';

const NowPlaying: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();
  const { listNowPlaying } = useAppSelector((state) => state.movieState);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Perform any action you want to refresh the data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    dispatch(getNowPlaying());
    // console.log(getListNowPlaying());
  }, []);

  //

  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { y: any } } }) => {
      if (event.nativeEvent) {
        const yOffset = event.nativeEvent.contentOffset.y;
        if (yOffset > 200) {
          // Change 200 to the desired threshold
          setShowScrollToTop(true);
        } else {
          setShowScrollToTop(false);
        }
      }
    },
    [],
  );
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {listNowPlaying.length > 0 && (
          <SearchBox
            text={searchText}
            onChangeText={(newText) => {
              setSearchText(newText);
              console.log(searchText);
            }}
            type="movie"
          />
        )}
        <View style={styles.container}>
          {listNowPlaying.length > 0 ? (
            
            listNowPlaying.filter(_ => _.Movie_Name.toLowerCase().includes(searchText.toLowerCase()))
            .map((movie) => (
              <MovieItem
                key={movie.Movie_Id}
                film={movie}
                direction="column"
                navigation={navigation}
              />
            ))
          ) : (
            <Text style={{ color: colors.whiteText }}>
              {t(
                'movie.no-movie.playing',
                'There are currently no playing movies',
              )}
            </Text>
          )}
        </View>
      </ScrollView>
      {showScrollToTop && (
        <TouchableOpacity
          onPress={scrollToTop}
          style={{ position: 'absolute', bottom: 10, right: 20 }}
        >
          <Image
            style={{ height: 64, width: 64, tintColor: 'green' }}
            source={require('@assets/icons/backtop.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingBottom: 75,
  },
});

export default NowPlaying;

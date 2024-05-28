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

import colors from '@/utils/colors';
import SearchBox from '@app-components/SearchBox';
import { ComingSoonItem } from '@app-components/Movie';
import { getComingSoon } from '@/redux/features/movieSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const ComingSoon: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { listComingSoon } = useAppSelector((state) => state.movieState);

  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Perform any action you want to refresh the data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    dispatch(getComingSoon());
    // console.log(getListNowPlaying());
  }, []);

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
        {listComingSoon.length > 0 && (
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
          {listComingSoon.length > 0 ? (
            listComingSoon
              .filter((_) =>
                _.Movie_Name.toLowerCase().includes(searchText.toLowerCase()),
              )
              .map((movie) => (
                <ComingSoonItem
                  key={movie.Movie_Id}
                  film={movie}
                  navigation={navigation}
                />
              ))
          ) : (
            <Text style={{ color: colors.whiteText }}>
              {t(
                'movie.no-movie.coming',
                'There are currently no upcoming movies',
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
  },
});

export default ComingSoon;

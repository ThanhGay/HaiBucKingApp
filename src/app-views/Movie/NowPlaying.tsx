import React, { useCallback, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { MovieItem } from '@app-components/Movie';
import colors from '@/utils/colors';
import SearchBox from '@app-components/SearchBox';
import { getListNowPlaying } from '@/redux/features/userSlice';

const NowPlaying: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { listNowPlaying } = useAppSelector((state) => state.userState);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Perform any action you want to refresh the data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    dispatch(getListNowPlaying());
    // console.log(getListNowPlaying());
  }, []);

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {listNowPlaying.length > 0 && <SearchBox type="movie" />}
        <View style={styles.container}>
          {listNowPlaying.length > 0 ? (
            listNowPlaying.map((movie) => (
              <MovieItem
                key={movie.Movie_Id}
                film={movie}
                direction="column"
                navigation={navigation}
              />
            ))
          ) : (
            <Text style={{ color: colors.whiteText }}>
              Hiện không có phim nào đang chiếu
            </Text>
          )}
        </View>
      </ScrollView>
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

export default NowPlaying;

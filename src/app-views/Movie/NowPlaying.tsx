import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { useAppSelector } from '@/redux/hooks';
import { MovieItem } from '@app-components/Movie';
import SearchBox from '@app-components/SearchBox';
import colors from '@/utils/colors';

const NowPlaying: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { listNowPlaying } = useAppSelector((state) => state.movieState);
  return (
    <View>
      {listNowPlaying.length > 0 && <SearchBox type="movie" />}
      <ScrollView>
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
              {t('movie.no-movie')}
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
    paddingBottom:75
  },
});

export default NowPlaying;

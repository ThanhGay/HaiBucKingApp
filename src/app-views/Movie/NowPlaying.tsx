import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { useAppSelector } from '@/redux/hooks';
import { MovieItem } from '@app-components/Movie';
import colors from '@/utils/colors';

const NowPlaying: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { listNowPlaying } = useAppSelector((state) => state.userState);
  return (
    <View>
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

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { useAppSelector } from '@/redux/hooks';
import { MovieItem } from '@app-components/Movie';



const NowPlaying: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const {listNowPlaying} = useAppSelector((state) => state.userState)
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {listNowPlaying.map((movie) => (
            <MovieItem
              key={movie.Movie_Id}
              film={movie}
              direction="column"
              navigation={navigation}
            />
          ))}
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

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import MovieItem from './components/MovieItem';

const listMovie = [
  {
    key: 1,
    name: 'Avatar 2',
    star: 4,
    totalRate: 982,
    duration: '124',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-5.png'),
  },
  {
    key: 2,
    name: 'Guardians of the Galaxy',
    star: 4,
    totalRate: 982,
    duration: '351',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-4.png'),
  },
  {
    key: 3,
    name: 'Cat in Hindie',
    star: 4,
    totalRate: 1562,
    duration: '200',
    category: 'Action, Romance',
    poster: require('@assets/images/movie-8.png'),
  },
  {
    key: 4,
    name: 'Avengers: Infinity Wars',
    star: 4.5,
    totalRate: 234,
    duration: '40',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-3.png'),
  },
  {
    key: 5,
    name: 'Batman vs Superman',
    star: 4,
    totalRate: 982,
    duration: '128',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-2.png'),
  },
  {
    key: 6,
    name: 'The flash',
    star: 4,
    totalRate: 982,
    duration: '128',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-7.png'),
  },
];

const NowPlaying: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {listMovie.map((movie) => (
            <MovieItem
              key={movie.key}
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

import { ScrollView, StyleSheet, View } from 'react-native';
import MovieItem from './components/MovieItem';

const listMovie = [
  {
    key: 1,
    name: 'Panda',
    star: 4,
    totalRate: 982,
    duration: '124',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-8.png'),
  },
  {
    key: 2,
    name: 'Panda',
    star: 4,
    totalRate: 982,
    duration: '351',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-6.png'),
  },
  {
    key: 3,
    name: 'Panda',
    star: 4,
    totalRate: 1562,
    duration: '200',
    category: 'Action, Romance',
    poster: require('@assets/images/movie-5.png'),
  },
  {
    key: 4,
    name: 'Panda',
    star: 4.5,
    totalRate: 234,
    duration: '40',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-2.png'),
  },
  {
    key: 5,
    name: 'Panda',
    star: 4,
    totalRate: 982,
    duration: '128',
    category: 'Action, Sci-fi',
    poster: require('@assets/images/movie-1.png'),
  },
];

const ComingSoon = () => {
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {listMovie.map((movie) => (
            <MovieItem key={movie.key} film={movie} />
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

export default ComingSoon;

import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import MovieItem from './components/MovieItem';
import BottomTab from '@/app-navigation/BottomTabs/BottomTab';
import { SafeAreaView } from 'react-native-safe-area-context';

const listMovie = [
  {
    key: 1,
    name: 'Panda',
    star: 4,
    totalRate: 982,
    duration: '124',
    category: 'Action, Sci-fi',
  },
  {
    key: 2,
    name: 'Panda',
    star: 4,
    totalRate: 982,
    duration: '351',
    category: 'Action, Sci-fi',
  },
  {
    key: 3,
    name: 'Panda',
    star: 4,
    totalRate: 1562,
    duration: '200',
    category: 'Action, Romance',
  },
  {
    key: 4,
    name: 'Panda',
    star: 4.5,
    totalRate: 234,
    duration: '40',
    category: 'Action, Sci-fi',
  },
  {
    key: 5,
    name: 'Panda',
    star: 4,
    totalRate: 982,
    duration: '128',
    category: 'Action, Sci-fi',
  },
];

const NowPlaying = () => {
  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={listMovie}
    //     numColumns={2}
    //     style={{ backgroundColor: 'black' }}
    //     renderItem={(movie) => <MovieItem film={movie.item} />}
    //   />
    // </View>

        <View>
          <ScrollView>
            <View style={styles.container}>
              {listMovie.map((movie) => (
                <MovieItem key={movie.key} film={movie} />
              ))}
            </View>
          </ScrollView>
          {/* <BottomTab /> */}
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

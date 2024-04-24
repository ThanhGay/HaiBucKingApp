import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { useAppSelector } from '@/redux/hooks';
import { ComingSoonItem } from '@app-components/Movie';


const ComingSoon: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const {listComingSoon} = useAppSelector((state) => state.userState)
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {listComingSoon.map((movie) => (
            <ComingSoonItem
              key={movie.Movie_Id}
              film={movie}
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

export default ComingSoon;

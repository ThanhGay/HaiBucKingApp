import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import { useAppSelector } from '@/redux/hooks';
import { ComingSoonItem } from '@app-components/Movie';
import SearchBox from '@app-components/SearchBox';
import colors from '@/utils/colors';

const ComingSoon: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { listComingSoon } = useAppSelector((state) => state.userState);
  return (
    <View>
      {listComingSoon.length > 0 && <SearchBox type="category" />}
      <ScrollView>
        <View style={styles.container}>
          {listComingSoon.length > 0 ? (
            listComingSoon.map((movie) => (
              <ComingSoonItem
                key={movie.Movie_Id}
                film={movie}
                navigation={navigation}
              />
            ))
          ) : (
            <Text style={{ color: colors.whiteText }}>
              {t('movie.no-movie', 'Hiện không có phim nào sắp chiếu')}
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

export default ComingSoon;

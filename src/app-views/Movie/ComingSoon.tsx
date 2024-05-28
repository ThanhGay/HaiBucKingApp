import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const { listComingSoon } = useAppSelector((state) => state.movieState);

  //

  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
      {listComingSoon.length > 0 && <SearchBox type="category" />}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
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

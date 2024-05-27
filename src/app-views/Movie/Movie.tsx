import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import NowPlaying from './NowPlaying';
import ComingSoon from './ComingSoon';
import BottomTab from '@/app-navigation/BottomTabs/BottomTab';
import { useLanguage } from '@/utils/hooks';
import colors from '@/utils/colors';

interface MovieProps {
  route: any;
}

interface NavItem {
  key: number;
  name: string;
  dataContent: React.ReactNode;
}

const Movie: React.FC<MovieProps & { navigation: NavigationProp<any> }> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation();
  var key = 1;
  route?.params ? (key = 2) : (key = 1);

  const [active, setActive] = useState(key);
  const nav: { [key: number]: NavItem } = useMemo(() => {
    return {
      1: {
        key: 1,
        name: t('movie.now-playing', 'Now playing'),
        dataContent: <NowPlaying navigation={navigation} />,
      },
      2: {
        key: 2,
        name: t('movie.coming-soon', 'Coming soon'),
        dataContent: <ComingSoon navigation={navigation} />,
      },
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {Object.values(nav).map((item) => (
          <TouchableOpacity key={item.key} onPress={() => setActive(item.key)}>
            <View
              style={{
                ...styles.button,
                // paddingHorizontal: useLanguage() === 'en' ? 46 : 23,
                backgroundColor:
                  item.key === active ? colors.primary : colors.blackOpacity,
              }}
            >
              <Text
                style={{
                  ...styles.text,
                  color:
                    item.key === active ? colors.blackText : colors.grayText,
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginLeft: 4, flex: 8 }}>{nav[active].dataContent}</View>
      {/* <View style={{ paddingHorizontal: 16 }}> */}
      <BottomTab />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: colors.black,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    borderRadius: 12,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 46,
    // marginBottom: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Movie;

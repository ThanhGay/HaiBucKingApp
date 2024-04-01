import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '@/utils/colors';
import NowPlaying from './NowPlaying';
import ComingSoon from './ComingSoon';
import BottomTab from '@/app-navigation/BottomTabs/BottomTab';

interface NavItem {
  key: number;
  name: string;
  dataContent: React.ReactNode;
}

function Movie() {
  const [active, setActive] = useState(1);
  const nav: { [key: number]: NavItem } = useMemo(() => {
    return {
      1: {
        key: 1,
        name: 'Now playing',
        dataContent: <NowPlaying />,
      },
      2: {
        key: 2,
        name: 'Coming soon',
        dataContent: <ComingSoon />,
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
      <BottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: colors.black,
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
    marginBottom: 16
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Movie;

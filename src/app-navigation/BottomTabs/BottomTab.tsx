import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import colors from '@/utils/colors';
import { useTranslation } from 'react-i18next';

interface ButtonTab {
  key: number;
  name: string;
  title: string;
  icon: any;
}

const ButtonTab = ({
  icon,
  text,
  color,
  handle,
}: {
  icon: any;
  text: any;
  color: string;
  handle: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
      }}
      onPress={handle}
    >
      <Image source={icon} style={{ height: 28, width: 28 }} />
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: color,
          paddingTop: 12,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const BottomTab = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [active, setActive] = useState<number>(0);
  const tabs: { [key: number]: ButtonTab } = useMemo(() => {
    return {
      1: {
        key: 1,
        name: 'Home',
        title: t('bottom-tab.home', 'Home'),
        icon: require('@/assets/icons/home.png'),
      },
      2: {
        key: 2,
        name: 'Ticket',
        title: t('bottom-tab.ticket', 'Ticket'),
        icon: require('@/assets/icons/ticket.png'),
      },
      3: {
        key: 3,
        name: 'Movie',
        title: t('bottom-tab.movie', 'Movie'),
        icon: require('@/assets/icons/camera.png'),
      },
      4: {
        key: 4,
        name: 'Profile',
        title: t('bottom-tab.profile', 'Profile'),
        icon: require('@/assets/icons/user.png'),
      },
    };
  }, []);

  return (
    <View style={{ flexDirection: 'row', height: 80 }}>
      {Object.values(tabs).map((tab) => (
        <ButtonTab
          key={tab.key}
          text={tab.title}
          icon={tab.icon}
          color={tab.key === active ? colors.primary : '#CCC'}
          handle={() => {
            navigation.navigate(tab.name);
            // setActive(tab.key);
          }}
        />
      ))}
    </View>
  );
};

export default BottomTab;

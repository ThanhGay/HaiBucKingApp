import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '@/utils/colors';

const ContentBox = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}
    >
      <Text style={styles.boldTitle}>{title}</Text>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          gap: 4,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        <Text style={{ color: colors.primary }}>{t('see-all', 'See all')}</Text>
        <Image
          source={require('@assets/icons/right.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boldTitle: {
    color: colors.whiteText,
    fontWeight: '700',
    fontSize: 26,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: colors.primary,
  },
});

export default ContentBox;

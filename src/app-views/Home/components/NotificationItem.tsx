import { View, Text } from 'react-native';
import React from 'react';
import colors from '@/utils/colors';
import { formatDate } from '@/utils/hooks';
import { useTranslation } from 'react-i18next';

export default function NotificationItem({ data }: { data: any }) {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 1,
        borderColor: colors.white,
        paddingVertical: 12,
      }}
    >
      <Text style={{ color: colors.whiteText, fontSize: 20 }}>
        {t('notification.part-1', "Don't forget you are scheduled to watch ")}
        <Text
          style={{ color: colors.primary, fontSize: 20, fontWeight: '600' }}
        >
          {data.Movie_Name}
        </Text>
        {t('notification.part-2', ' at ')}
        <Text
          style={{ color: colors.primary, fontSize: 20, fontWeight: '600' }}
        >
          {data.Time}
        </Text>
        {t('notification.part-3', ' on ')}
        <Text
          style={{ color: colors.primary, fontSize: 20, fontWeight: '600' }}
        >
          {formatDate(data.Date)}
        </Text>
      </Text>
    </View>
  );
}

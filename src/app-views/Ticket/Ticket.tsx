import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import BottomTab from '@/app-navigation/BottomTabs/BottomTab';
import TicketItem from './TicketItem';
import { Title } from '@/component/Component';
import colors from '@/utils/colors';

import { useAppSelector } from '@/redux/hooks';

const Ticket: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { listTicket } = useAppSelector((state) => state.ticketState);

  return (
    <View style={styles.container}>
      <Title title={t('ticket.title')} />

      <View style={{ flex: 9, gap: 16 }}>
        {listTicket.length > 0 ? (
          listTicket.length > 4 ? (
            <ScrollView>
              {listTicket.map((item, idx) => (
                <TicketItem key={idx} ticket={item} navigation={navigation} />
              ))}
            </ScrollView>
          ) : (
            listTicket.map((item, idx) => (
              <TicketItem key={idx} ticket={item} navigation={navigation} />
            ))
          )
        ) : (
          <Text style={{ color: colors.whiteText, textAlign: 'center' }}>
            {t('ticket.no-ticket', 'Hiện chưa có vé nào được đặt')}
          </Text>
        )}
      </View>

      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.whiteText,
    marginBottom: 32,
  },
});

export default Ticket;

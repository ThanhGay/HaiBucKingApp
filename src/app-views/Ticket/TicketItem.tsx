import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import colors from '@/utils/colors';

interface TicketItemProps {
  ticket: any;
}

const TicketItem: React.FC<
  TicketItemProps & { navigation: NavigationProp<any> }
> = ({ ticket, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DetailTicket')}
    >
      <Image source={ticket.poster} alt="poster" style={styles.poster} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{ticket.movie}</Text>
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <View style={styles.row}>
            <Image
              source={require('@assets/icons/clock-white.png')}
              alt="icon"
              height={16}
              width={16}
              style={styles.icon}
            />
            <Text style={{ color: colors.whiteText }}>{ticket.time}</Text>

            <View style={styles.dot} />

            <Text style={{ color: colors.whiteText }}>{ticket.date}</Text>
          </View>

          <View style={styles.row}>
            <Image
              source={require('@assets/icons/marker-white.png')}
              alt="icon"
              height={16}
              width={16}
              style={styles.icon}
            />
            <Text style={{ color: colors.whiteText }}>{ticket.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    borderRadius: 12,
    paddingRight: 20,
    backgroundColor: colors.blackOpacity,
  },
  poster: {
    width: 99,
    height: 138,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    objectFit: 'scale-down',
  },
  rightContainer: {
    paddingTop: 24,
    gap: 16,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.whiteText,
  },
  icon: {
    marginRight: 4,
    width: 16,
    height: 16,
  },
  dot: {
    width: 4,
    height: 4,
    marginHorizontal: 4,
    borderRadius: 50,
    backgroundColor: colors.whiteText,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TicketItem;

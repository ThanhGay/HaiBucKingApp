import colors from '@/utils/colors';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TicketItem = ({ ticket  }: { ticket: any }) => {
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <Image
        source={require('@assets/images/movie-4.png')}
        alt="poster"
        style={styles.poster}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{ticket.movie}</Text>
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <View style={styles.row}>
            <Image
              source={require('@assets/images/movie-2.png')}
              alt="icon"
              height={16}
              width={16}
              style={styles.icon}
            />
            <Text>{ticket.time}</Text>

            <View style={styles.dot} />

            <Text>{ticket.date}</Text>
          </View>

          <View style={styles.row}>
            <Image
              source={require('@assets/images/movie-2.png')}
              alt="icon"
              height={16}
              width={16}
              style={styles.icon}
            />
            <Text>{ticket.location}</Text>
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

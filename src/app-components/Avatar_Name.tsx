import colors from '@/utils/colors';
import { Image, StyleSheet, Text, View } from 'react-native';

function Avatar_Name({
  firstname,
  lastname,
}: {
  firstname: string;
  lastname: string;
}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/movie-3.png')}
        style={styles.image}
      />
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.text}>{firstname}</Text>
        <Text style={styles.text}>{lastname}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackOpacity,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  image: {
    width: 36,
    height: 36,
    marginRight: 12,
    borderRadius: 50,
    objectFit: 'cover',
  },
  text: {
    color: colors.whiteText,
  },
});

export default Avatar_Name;

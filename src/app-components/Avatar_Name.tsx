import colors from '@/utils/colors';
import { Image, StyleSheet, Text, View } from 'react-native';

function Avatar_Name({ name, image }: { name: string; image: string }) {
  const _space = name.indexOf(' ');
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : require('@assets/images/movie-3.png')}
        style={styles.image}
      />
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.text}>{name.slice(0, _space)}</Text>
        <Text style={styles.text}>{name.slice(_space + 1)}</Text>
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

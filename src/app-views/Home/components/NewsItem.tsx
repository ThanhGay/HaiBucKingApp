import colors from '@/utils/colors';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function NewsItem({ post }: { post: any }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View>
          <Image
            source={post.image}
            alt="img post"
            style={styles.image}
          />
          <Text style={styles.title}>{post.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 239,
    height: 185,
  },
  image: {
    width: 239,
    height: 135,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flexWrap: 'wrap',
    color: colors.whiteText,
  },
});

export default NewsItem;

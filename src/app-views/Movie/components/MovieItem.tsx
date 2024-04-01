import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import colors from "@/utils/colors";
import { convertTime } from "@/utils/hooks";
import { CameraIcon, ClockIcon, StarIcon } from "@/app-uikits/icon";

const MovieItem = ({film} : {film ?: any}) => {
    const basicInfo = [
      {
        key: 1,
        name: 'rate',
        icon: StarIcon(),
        value: `${film?.star} (${film?.totalRate})`,
      },
      {
        key: 2,
        name: 'duration',
        icon: ClockIcon(),
        value: convertTime(film?.duration),
      },
      {
        key: 3,
        name: 'category',
        icon: CameraIcon(),
        value: film?.category,
      },
    ];

    return (
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.image}
          source={require('@assets/images/movie-1.png')}
        />
        <View>
          <Text style={styles.title}>{film?.name}</Text>
          <View>
            <View>
              {basicInfo.map((item) => (
                <View key={item.key} style={{flexDirection: 'row', marginVertical: 2}}>
                  <Image
                    style={styles.icon}
                    source={require('@assets/images/movie-2.png')}
                    alt={item.name}
                  />
                  <Text style={styles.text}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 190,
        height: 385,
    },
    image: {
        width: 190,
        height: 265,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary,
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    text: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.grayText,
    }
})

export default MovieItem
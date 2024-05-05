import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import colors from '@/utils/colors';
import { FlatList } from 'react-native';

const Item = ({ title }: { title: any }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.whiteText,
        marginBottom: 8,
      }}
    >
      <Text
        style={{ color: colors.whiteText, fontSize: 18, flex: 6, padding: 8 }}
        numberOfLines={1}
      >
        {title.Movie_Name}
      </Text>
      <View
        style={{ backgroundColor: colors.whiteText, height: 'auto', width: 1 }}
      ></View>
      <Text
        style={{ color: colors.whiteText, fontSize: 18, flex: 3, padding: 8 }}
      >
        {title.Total}
      </Text>
    </View>
  );
};
const data = [
  {
    Movie_Name: 'Bi mat noi goc toi',
    Total: 30000,
  },
  {
    Movie_Name: 'Luu ly my nhan sat',
    Total: 50000,
  },
  {
    Movie_Name: 'Date a live',
    Total: 100000,
  },
  {
    Movie_Name: 'Bi mat noi goc toi',
    Total: 30000,
  },
  {
    Movie_Name: 'Luu ly my nhan sat',
    Total: 50000,
  },
  {
    Movie_Name: 'Date a live',
    Total: 100000,
  },
  {
    Movie_Name: 'Bi mat noi goc toi',
    Total: 30000,
  },
  {
    Movie_Name: 'Luu ly my nhan sat',
    Total: 50000,
  },
  {
    Movie_Name: 'Date a live',
    Total: 100000,
  },
  {
    Movie_Name: 'Bi mat noi goc toi',
    Total: 30000,
  },
  {
    Movie_Name: 'Luu ly my nhan sat',
    Total: 50000,
  },
  {
    Movie_Name: 'Date a live',
    Total: 100000,
  },
  {
    Movie_Name: 'Bi mat noi goc toi',
    Total: 30000,
  },
  {
    Movie_Name: 'Luu ly my nhan sat',
    Total: 50000,
  },
  {
    Movie_Name: 'Date a live',
    Total: 100000,
  },
];
function ByMovie() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          borderColor: colors.whiteText,
          borderWidth: 1,
          marginTop: 16,
        }}
      >
        <Text
          style={{
            color: colors.whiteText,
            fontSize: 18,
            flex: 6,
            padding: 8,
          }}
        >
          Movie Name
        </Text>
        <View
          style={{
            backgroundColor: colors.whiteText,
            height: 'auto',
            width: 1,
          }}
        ></View>
        <Text
          style={{ color: colors.whiteText, fontSize: 18, flex: 3, padding: 8 }}
        >
          Total
        </Text>
      </View>
      <FlatList data={data} renderItem={({ item }) => <Item title={item} />} />
    </View>
  );
}
export default ByMovie;

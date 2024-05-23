import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { apiGetReportByMovie } from '@/api/admin';
import { useAppSelector } from '@/redux/hooks';
import colors from '@/utils/colors';

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

function ByMovie() {
  const { token } = useAppSelector((state) => state.authState);
  const [listMovie, setListMovie] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRes = await apiGetReportByMovie({ token });
        if (dataRes.status) {
          // Lấy dữ liệu từ dataRes và tạo mảng mới với cấu trúc tương tự như data mẫu
          const newData = dataRes.data.map(
            (item: { Movie_Name: any; Total: any }) => ({
              Movie_Name: item.Movie_Name,
              Total: item.Total,
            }),
          );
          // Set listMovie với dữ liệu mới
          setListMovie(newData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      <FlatList
        data={listMovie}
        renderItem={({ item }) => <Item title={item} />}
      />
    </View>
  );
}
export default ByMovie;

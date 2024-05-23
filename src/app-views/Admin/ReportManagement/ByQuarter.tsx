import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { apiGetReportByQuarter } from '@/api/admin';
import { useAppSelector } from '@/redux/hooks';
import colors from '@/utils/colors';

const Item = ({ item }: { item: any }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderColor: colors.whiteText,
        borderWidth: 1,
        marginVertical: 8,
      }}
    >
      <Text
        style={{
          color: colors.whiteText,
          fontSize: 20,
          flex: 1,
          padding: 8,
        }}
      >
        {item.quarter}
      </Text>
      <View
        style={{ height: 'auto', width: 1, backgroundColor: colors.whiteText }}
      />
      <Text
        style={{
          color: colors.whiteText,
          fontSize: 20,
          flex: 4,
          padding: 8,
        }}
      >
        {item.total}
      </Text>
    </View>
  );
};
interface ChartProps {
  data: any[];
}

const ChartExample: React.FC<ChartProps> = ({ data }) => {
  const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
  const colors = ['#007AFF', '#FF9500', '#4CD964', '#FF3B30'];

  const bars = data.map(({ quarter, total }, index) => {
    const hei = 100;
    const percentage = (total / totalRevenue) * hei;

    return (
      <View key={quarter}>
        <Text style={styles.label}>
          {((percentage / hei) * 100).toFixed(1)}%
        </Text>
        <View
          style={{
            width: 50,
            height: `${percentage}%`,
            backgroundColor: colors[index % colors.length],
          }}
        ></View>
        <Text style={styles.label}>{quarter}</Text>
      </View>
    );
  });

  return <View style={styles.container}>{bars}</View>;
};

function ByQuarter() {
  const [year, setYear] = useState<string>();
  const [handle, setHandle] = useState(false);
  const [listData, setListData] = useState<Array<any>>([]);
  const { token } = useAppSelector((state) => state.authState);
  const handleSubmit = async () => {
    setHandle(true);
    const dataRes = await apiGetReportByQuarter({ year: Number(year), token });
    if (dataRes.status) {
      const newData = dataRes.data.map(
        (item: { Quarter: any; Revenue: any }) => ({
          quarter: item.Quarter,
          total: item.Revenue,
        }),
      );
      setListData(newData);
    } else {
      console.error('API Error:', dataRes.msg);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Choose year */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: colors.whiteText, fontSize: 24, flex: 2 }}>
          Please enter the year:
        </Text>
        <View
          style={{ flex: 1, borderColor: colors.whiteText, borderWidth: 1 }}
        >
          <TextInput
            placeholder="Choose Year"
            placeholderTextColor={colors.whiteText}
            style={{
              color: colors.whiteText,
              fontSize: 20,

              opacity: year ? 1 : 0.8,
              marginVertical: -8,
            }}
            onChangeText={setYear}
            value={year}
            keyboardType="numeric"
            onSubmitEditing={handleSubmit}
          />
        </View>
      </View>
      {/* Body */}

      {handle && (
        <View>
          <View>
            <FlatList
              data={listData}
              renderItem={({ item }) => <Item item={item} />}
            />
          </View>

          <ChartExample data={listData} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 45,
    height: 230,
    backgroundColor: colors.grayText,
  },

  label: {
    color: colors.black,
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ByQuarter;

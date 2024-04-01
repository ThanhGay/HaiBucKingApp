import colors from '@/utils/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CanBackLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <View style={styles.header}>
        <TouchableOpacity style={{ width: 40, height: 40 }}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={{ width: 40, height: 40 }} />
      </View>
      <View style={{flex: 1}}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  title: { fontSize: 20, fontWeight: '700', color: colors.white },
});

export default CanBackLayout;

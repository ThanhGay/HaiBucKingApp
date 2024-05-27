import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import colors from '@/utils/colors';

import { apiDeleteCategory } from '@/api/admin';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getListCategory } from '@/redux/features/adminSlice';

const Category = ({ data, onPress }: { data: any; onPress: () => void }) => {
  const [choose, setChoose] = useState(false);

  const handleSubmit = () => {
    setChoose(!choose);
    onPress();
  };
  return (
    <TouchableOpacity
      style={{
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: choose ? colors.primary : colors.whiteText,
        backgroundColor: choose ? colors.primary : '#1C1C1C',
        borderWidth: 1,
        flex: 1,
        margin: 4,
        borderRadius: 18,
      }}
      onPress={handleSubmit}
    >
      <Text
        style={{
          color: choose ? colors.black : colors.whiteText,
          textAlign: 'center',
          fontSize: 18,
        }}
      >
        {data.Category_Name}
      </Text>
    </TouchableOpacity>
  );
};
export default function DeleteCategory() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authState);
  const { listCategory } = useAppSelector((state) => state.adminState);

  const [selectedCategories, setSelectedCategories] = useState<Array<any>>([]);
  const handleCategoryPress = (category: any) => {
    const isSelected = selectedCategories.some(
      (item) => item.Category_Id === category.Category_Id,
    );
    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter(
          (item) => item.Category_Id !== category.Category_Id,
        ),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleSubmit = () => {
    if (selectedCategories.length > 0) {
      const sortedSelectedCategories = selectedCategories.sort(
        (a, b) => a.Category_Id - b.Category_Id,
      );

      sortedSelectedCategories.forEach((item: any) => {
        (async () => {
          const dataRes = await apiDeleteCategory({
            token,
            cateId: item.Category_Id,
          });

          if (dataRes.status) {
            Alert.alert('Notice', dataRes.msg);
          } else {
            Alert.alert('Notice', dataRes.msg);
          }
        })();
      });

      dispatch(getListCategory());
      console.log('Selected Categories:', sortedSelectedCategories);
    } else {
      console.log('Selected Categories: []');
    }
  };

  return (
    <View style={{ flex: 1, gap: 30 }}>
      <FlatList
        style={{ marginTop: 20 }}
        data={listCategory}
        renderItem={({ item }) => (
          <Category data={item} onPress={() => handleCategoryPress(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />

      <View
        style={{
          //   flex: 1,
          justifyContent: 'center',
          backgroundColor: colors.primary,
          borderRadius: 64,
          height: 50,
        }}
      >
        <TouchableOpacity onPress={handleSubmit}>
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

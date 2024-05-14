import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '@/utils/colors';
import { apiGetCategory } from '@/api/movieAdmin';
import { useAppSelector } from '@/redux/hooks';

const Category = ({ data, onPress }: { data: any; onPress: () => void }) => {
  const [choose, setChoose] = useState(false);

  const handleSubmit = () => {
    setChoose(!choose);
    onPress();
  };
  return (
    <View
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
    >
      <TouchableOpacity onPress={handleSubmit}>
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
    </View>
  );
};
export default function DeleteCategory() {
  const listCategory = useAppSelector((state) => state.adminState.listCategory);

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

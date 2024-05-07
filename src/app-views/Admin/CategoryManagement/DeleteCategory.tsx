import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import colors from '@/utils/colors';

const listCategory = [
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
  {
    category_Id: 1,
    category_Name: 'hai huoc',
  },
  {
    category_Id: 2,
    category_Name: 'kinh di',
  },
  {
    category_Id: 3,
    category_Name: 'hoc duong',
  },
  {
    category_Id: 4,
    category_Name: 'hanh dong',
  },
  {
    category_Id: 5,
    category_Name: 'huyen ao',
  },
];
const Category = ({ data, onPress }: { data: any; onPress: () => void }) => {
  const [choose, setChoose] = useState(false);

  const handleSubmit = () => {
    setChoose(!choose);
    onPress();
  };
  return (
    <View
      style={{
        borderColor: choose ? colors.primary : colors.whiteText,
        backgroundColor: choose ? colors.primary : '#1C1C1C',
        borderWidth: 1,
        flex: 1,
        margin: 5,
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
          {data.category_Name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default function DeleteCategory() {
  const [category_Id, setCategory_Id] = useState('');

  const handle = () => {
    console.log(category_Id);
  };
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const handleCategoryPress = (category: any) => {
    const isSelected = selectedCategories.some(
      (item) => item.category_Id === category.category_Id,
    );
    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter(
          (item) => item.category_Id !== category.category_Id,
        ),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleSubmit = () => {
    if (selectedCategories.length > 0) {
      const sortedSelectedCategories = selectedCategories.sort(
        (a, b) => a.category_Id - b.category_Id,
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
      ></FlatList>

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

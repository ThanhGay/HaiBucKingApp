import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import colors from '@/utils/colors';

import { apiEditCategory, apiGetCategory } from '@/api/admin';
import { useAppSelector } from '@/redux/hooks';

interface CategoryItemProps {
  data: any;
  onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ data, onClick }) => {
  return (
    <TouchableOpacity style={styles.categoryBox} onPress={onClick}>
      <Text style={styles.text}>Id: {data.Category_Id}</Text>
      <Text style={styles.text}> Name: {data.Category_Name}</Text>
    </TouchableOpacity>
  );
};
function EditCategory() {
  const { token } = useAppSelector((state) => state.authState);
  const [listCategory, setListCategory] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const dataRes = await apiGetCategory();
      if (dataRes.status) {
        setListCategory(dataRes.data);
      }
    })();
  }, [listCategory]);

  const [category_Id, setCategory_Id] = useState('');
  const [category_Name, setCategory_Name] = useState('');

  const handleSubmit = async () => {
    const dataRes = await apiEditCategory({
      token,
      cateId: category_Id,
      cateName: category_Name,
    });
    const index = listCategory.findIndex((c) => c.Category_Id === category_Id);

    if (dataRes.status) {
      Alert.alert('Notice', dataRes.msg);
      setListCategory([...listCategory, (listCategory[index] = dataRes.data)]);
      setCategory_Id('');
      setCategory_Name('');
    }
  };
  return (
    <View style={{ flex: 1, gap: 30 }}>
      <FlatList
        data={listCategory}
        renderItem={({ item, index }) => (
          <CategoryItem
            key={index}
            data={item}
            onClick={() => {
              setCategory_Id(item.Category_Id);
              setCategory_Name(item.Category_Name);
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      <View style={{ borderColor: colors.whiteText, borderWidth: 1 }}>
        <TextInput
          placeholder="Category Id"
          value={category_Id}
          placeholderTextColor={colors.grayText}
          style={{ color: colors.whiteText, fontSize: 24 }}
          onChangeText={(text) => setCategory_Id(text)}
        />
      </View>
      <View style={{ borderColor: colors.whiteText, borderWidth: 1 }}>
        <TextInput
          placeholder="Category Name"
          value={category_Name}
          placeholderTextColor={colors.grayText}
          style={{ color: colors.whiteText, fontSize: 24 }}
          onChangeText={(text) => setCategory_Name(text)}
        />
      </View>
      <View
        style={{
          // flex: 1,
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
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryBox: {
    flex: 1,
    borderColor: colors.whiteText,
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    padding: 4,
  },
  text: {
    color: colors.blackText,
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 6,
  },
});

export default EditCategory;

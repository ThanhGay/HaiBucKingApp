import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import colors from '@/utils/colors';
import { apiPostAddCategory } from '@/api/movieAdmin';
import { useAppSelector } from '@/redux/hooks';

export default function CreateCategory() {
  const { token } = useAppSelector((state) => state.authState);
  const [category_Id, setCategory_Id] = useState('');
  const [category_Name, setCategory_Name] = useState('');

  const handle = async () => {
    const dataRes = await apiPostAddCategory({
      token,
      categoryId: category_Id,
      categoryName: category_Name,
    });
    if (dataRes.status) {
      Alert.alert('Notice', dataRes.msg);
      setCategory_Id('');
      setCategory_Name('');
    } else {
       Alert.alert('Notice', dataRes.msg);
    }
  };
  return (
    <View style={{ flex: 1, gap: 30 }}>
      <View
        style={{ borderColor: colors.whiteText, borderWidth: 1, marginTop: 30 }}
      >
        <TextInput
          placeholder="Category Id"
          placeholderTextColor={colors.grayText}
          style={{ color: colors.whiteText, fontSize: 24 }}
          onChangeText={(text) => setCategory_Id(text)}
        ></TextInput>
      </View>
      <View style={{ borderColor: colors.whiteText, borderWidth: 1 }}>
        <TextInput
          placeholder="Category Name"
          placeholderTextColor={colors.grayText}
          style={{ color: colors.whiteText, fontSize: 24 }}
          onChangeText={(text) => setCategory_Name(text)}
        ></TextInput>
      </View>
      <View
        style={{
          //   flex: 1,
          justifyContent: 'center',
          backgroundColor: colors.primary,
          borderRadius: 64,
          height: 50,
        }}
      >
        <TouchableOpacity onPress={handle}>
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

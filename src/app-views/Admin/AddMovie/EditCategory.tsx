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
];

const Category = ({ data }: { data: any }) => {
  return (
    <View
      style={{
        // flexDirection: 'row',
        flex: 1,
        borderColor: colors.whiteText,
        borderWidth: 1,
        borderRadius: 18,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        margin: 4,
        padding: 4,
      }}
    >
      <Text
        style={{
          color: colors.blackText,
          fontSize: 16,
          textAlign: 'left',
          marginLeft: 6,
        }}
        numberOfLines={1}
      >
        Id: {data.category_Id} Name: {data.category_Name}
      </Text>
    </View>
  );
};
export default function EditCategory() {
  const [category_Id, setCategory_Id] = useState('');
  const [category_Name, setCategory_Name] = useState('');

  const handle = () => {
    console.log(category_Id, category_Name);
  };
  return (
    <View style={{ flex: 1, gap: 30 }}>
      <FlatList
        data={listCategory}
        renderItem={({ item }) => <Category data={item}></Category>}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      <View style={{ borderColor: colors.whiteText, borderWidth: 1 }}>
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
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

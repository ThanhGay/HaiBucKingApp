import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { Title, Box } from '@/component/Component';

export default function EditProfile() {
  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <Title title={'Profile'} />
      <View style={{ flex: 8, alignItems: 'center' }}>
        <Image
          style={{ height: 120, width: 120, borderRadius: 120 }}
          source={require('@/assets/icons/translate.png')}
        />
      </View>
    </View>
  );
}

const BoxEditProfile = () => {
  return <TextInput />;
};

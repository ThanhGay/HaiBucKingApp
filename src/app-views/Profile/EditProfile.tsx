import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { Button, Title } from '@/component/Component';
import { useNavigation } from '@react-navigation/native';
export default function EditProfile() {
  const navigation = useNavigation();

  const [edit, setEdit] = useState(false);
  return (
    <View style={{ backgroundColor: 'black', flex: 1, paddingHorizontal: 16 }}>
      <Title
        leftIcon
        title={edit ? 'Edit profile' : 'Detail profile'}
        rightIcon={
          <Image
            style={{ height: 32, width: 32 }}
            source={require('@assets/icons/edit.png')}
          />
        }
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setEdit(true)}
      />
      <View style={{ flex: 8 }}>
        <Image
          style={{
            height: 120,
            width: 120,
            borderRadius: 120,
            alignSelf: 'center',
          }}
          source={require('@/assets/images/avatar.png')}
        />
        <BoxEditProfile
          link={require('@/assets/icons/avata.png')}
          title="Đức Thành"
          titleEdit="Your name"
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/avata.png')}
          title="034-898-2339"
          titleEdit="Your phone number"
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/avata.png')}
          title="ducthanh@gmail.com"
          titleEdit="Your email"
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/avata.png')}
          title="23/09/2023"
          titleEdit="Your birthday"
          edit={edit}
        />
        {edit && (
          <Button
            title={'Save'}
            onPress={() => {
              setEdit(false);
            }}
          ></Button>
        )}
      </View>
    </View>
  );
}

const BoxEditProfile = ({
  link,
  title,
  titleEdit,
  edit,
}: {
  link: any;
  title: string;
  titleEdit: string;
  edit: boolean;
}) => {
  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={link} style={{ height: 32, width: 32 }} />
        <TextInput
          defaultValue={title}
          style={{
            fontSize: 24,
            fontWeight: '700',
            marginLeft: 10,
            color: 'white',
          }}
          placeholder={titleEdit}
          placeholderTextColor={edit ? '#797979' : 'white'}
          editable={edit}
        />
      </View>
      <View
        style={{ height: 1, backgroundColor: '#8D8D8D', marginVertical: 10 }}
      />
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
};

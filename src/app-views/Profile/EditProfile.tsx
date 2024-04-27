import React, { useState } from 'react';
import { View, Image, TextInput, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, Title } from '@/component/Component';

const EditProfile = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { user } = route.params;

  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState(user.FullName)
  const [phoneNumber, setPhoneNumber] = useState(user.PhoneNumber)
  const [email, setEmail] = useState(user.Email)
  const [dob, setDob] = useState(user.DateOfBirth.slice(0, 10))

  const handleSubmit = () => {
    const form = JSON.stringify({
      Fullname: username,
      PhoneNumber: phoneNumber, 
      Email: email,
      DateOfBirth: dob
  })
    
  console.log(form);
  
  };
  

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
          value={username}
          onChangeText={(newValue) => setUsername(newValue)}
          placeholder="Your name"
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/phone.png')}
          value={phoneNumber}
          onChangeText={(newValue) => setPhoneNumber(newValue)}
          placeholder="Your phone number"
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/email.png')}
          value={email}
          onChangeText={(newValue) => setEmail(newValue)}
          placeholder="Your email"
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/cake.png')}
          value={dob}
          onChangeText={(newValue) => setDob(newValue)}
          placeholder="Your birthday"
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
};

const BoxEditProfile = ({
  link,
  value,
  placeholder,
  onChangeText,
  edit,
}: {
  link: any;
  value: string;
  placeholder: string;
  edit: boolean;
  onChangeText?: (str: string) => void
}) => {
  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={link} style={{ height: 32, width: 32 }} />
        <TextInput
          defaultValue={value}
          style={{
            fontSize: 24,
            fontWeight: '700',
            marginLeft: 10,
            color: 'white',
            width: '100%',
          }}
          placeholder={placeholder}
          placeholderTextColor={edit ? '#797979' : 'white'}
          onChangeText={onChangeText}
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

export default EditProfile;

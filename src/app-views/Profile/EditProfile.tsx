import React, { useState } from 'react';
import { View, Image, TextInput, StatusBar, Text, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Button, Title } from '@/component/Component';
import { apiEditProfile } from '@/api/auth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDataUser } from '@/redux/features/authSlice';

const emailRegex = new RegExp(
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
  'gm',
);

const EditProfile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { token, user } = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState(user.FullName);
  const [phoneNumber, setPhoneNumber] = useState(user.PhoneNumber);
  const [email, setEmail] = useState(user.Email);
  const [dob, setDob] = useState(user.DateOfBirth.slice(0, 10));

  const [errMes, setErrMes] = useState('');

  const handleSubmit = async () => {
    if (emailRegex.test(email) && phoneNumber.length === 10) {
      setEdit(false);
      const form = JSON.stringify({
        FullName: username.trim(),
        NewPhoneNumber: phoneNumber.trim(),
        Email: email.trim(),
        DateOfBirth: dob.trim(),
      });

      const dataRes = await apiEditProfile({ token, data: form });
      if (dataRes.status) {
        (() =>
          Alert.alert(
            t('notice.notice', 'Notice'),
            t(
              'messages.success.update.information',
              'Your information is updated!',
            ),
          ))();
        dispatch(
          setDataUser({
            ...user,
            PhoneNumber: phoneNumber,
            FullName: username,
            Email: email,
            DateOfBirth: dob,
          }),
        );
      } else {
        console.log('cancel fetch api edit profile');
      }
    } else {
      setErrMes('Your data is not in the correct format.');
      console.log('error data type');
    }
  };

  return (
    <View style={{ backgroundColor: 'black', flex: 1, paddingHorizontal: 16 }}>
      <Title
        leftIcon
        title={
          edit
            ? t('profile.edit.title.edit', 'Edit profile')
            : t('profile.edit.title.detail', 'Detail profile')
        }
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
          placeholder={t('profile.edit.input.name', 'Your name')}
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/phone.png')}
          value={phoneNumber}
          onChangeText={(newValue) => setPhoneNumber(newValue)}
          placeholder={t('profile.edit.input.phone', 'Your phone number')}
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/email.png')}
          value={email}
          onChangeText={(newValue) => setEmail(newValue)}
          placeholder={t('profile.edit.input.email', 'Your email')}
          edit={edit}
        />
        <BoxEditProfile
          link={require('@/assets/icons/cake.png')}
          value={dob}
          onChangeText={(newValue) => setDob(newValue)}
          placeholder={t(
            'profile.edit.input.birthday',
            'Your birthday (YYYY/MM/DD)',
          )}
          edit={edit}
        />
        {edit && (
          <View>
            <Text style={{ color: 'red' }}>{errMes}</Text>
            <Button title={t('buttons.save')} onPress={handleSubmit} />
          </View>
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
  onChangeText?: (str: string) => void;
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

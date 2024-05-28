import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

import BottomTab from '@app-navigation/BottomTabs/BottomTab';
import ModalLanguage from '@/app-modals/ModalLanguage';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authLogout } from '@/redux/features/authSlice';

export const BoxProfile = ({
  link,
  title,
  onPress,
}: {
  link: any;
  title: string;
  onPress(): void;
}) => {
  return (
    <View style={{ paddingTop: 24 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <Image style={{ height: 32, width: 32 }} source={link} />
        <TouchableOpacity onPress={onPress} style={{ width: '100%' }}>
          <Text style={{ color: '#F2F2F2', fontSize: 16, fontWeight: '700' }}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: '#4A4A4A', marginTop: 24 }} />
    </View>
  );
};

const Profile: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  const [showModal, setshowModal] = useState(false);

  const handleSignOut = async () => {
    dispatch(authLogout());
    navigation.navigate('Splash');
  };
  const onPressNavigateToAdminStack = () => {
    navigation.navigate('MovieAdmin');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile', { user })}
      >
        <View style={styles.header}>
          <View style={{ gap: 24, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ height: 90, width: 90, borderRadius: 90 }}
              source={require('@/assets/icons/user.png')}
            />
            <Text style={{ color: '#F2F2F2', fontSize: 32, fontWeight: '700' }}>
              {user.FullName}
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('@/assets/icons/right.png')}
              style={{ width: 32, height: 32 }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.body}>
        <BoxProfile
          link={require('@/assets/icons/translate.png')}
          title={t('profile.change-language', 'Change language')}
          onPress={() => setshowModal(true)}
        />
        <BoxProfile
          link={require('@/assets/icons/lock.png')}
          title={t('profile.change-password', 'Change password')}
          onPress={() => navigation.navigate('ChangePassword')}
        />
        {user.Role_Id && (
          <BoxProfile
            link={require('@/assets/icons/admin-settings.png')}
            title={t('profile.to-admin', 'To Admin Management')}
            onPress={onPressNavigateToAdminStack}
          />
        )}
        <TouchableOpacity
          style={{
            borderRadius: 64,
            marginTop: 40,
            borderColor: 'red',
            borderWidth: 2,
            height: 56,
            justifyContent: 'center',
          }}
          onPress={handleSignOut}
        >
          <Text
            style={{
              color: '#FF0000',
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {t('profile.sign-out', 'Sign out')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}></View>
      <BottomTab />
      <ModalLanguage visible={showModal} onClose={() => setshowModal(false)} />

      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 3,
  },
  body: {},
  footer: {
    flex: 1,
  },
});

export default Profile;

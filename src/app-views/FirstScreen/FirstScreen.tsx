import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { useAppSelector } from '@/redux/hooks';
import ModalLanguage from '@/app-modals/ModalLanguage';

const FirstScreen: React.FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const [showModal, setshowModal] = useState(false);
  const [language, setLanguage] = useState('Language');

  const { user } = useAppSelector((state) => state.authState);
  console.log('FirstScreen: ', user);

  const toSignin = () => {
    navigation.navigate('Signin');
  };

  const toSignup = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/logo/Logo-M.png')}></Image>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            borderColor: 'white',
            backgroundColor: 'black',
            height: 35,
            borderWidth: 1,
            paddingHorizontal: 8,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => setshowModal(true)}
        >
          <Image
            style={{ height: 20, width: 20 }}
            source={require('@/assets/icons/translate.png')}
          />
          <Text style={{ fontSize: 16, fontWeight: '400', color: '#E6E6E6' }}>
            {language}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Image
          source={require('@/assets/images/movie-3.png')}
          style={{ height: 420, borderRadius: 32 }}
        />
        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
          HaiBucKing hello!
        </Text>
        <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
          Enjoy your favorite movies
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.signin} onPress={toSignin}>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: 20,
              color: '#000000',
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signup} onPress={toSignup}>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: 20,
              color: '#FFFFFF',
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 14,
            color: '#FFFFFF',
            marginHorizontal: 40,
          }}
        >
          By sign in or sign up, you argee to our Terms of Service and Privacy
          Policy
        </Text>
      </View>
      <ModalLanguage visible={showModal} onClose={() => setshowModal(false)} />
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'black',
    height: 35,
    borderWidth: 1,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  trans: {
    height: 25,
    width: 25,
  },
  body: {
    marginTop: 35,
    alignItems: 'center',
    gap: 10,
  },
  footer: {
    paddingTop: 30,
    gap: 15,
    marginHorizontal: 20,
  },
  signin: {
    backgroundColor: '#FCC435',
    borderRadius: 64,
    borderWidth: 1,
    height: 50,
    paddingTop: 10,
  },
  signup: {
    backgroundColor: '#000000',
    borderRadius: 64,
    borderColor: 'white',
    borderWidth: 1,
    height: 50,
    paddingTop: 10,
  },
});

export default FirstScreen;

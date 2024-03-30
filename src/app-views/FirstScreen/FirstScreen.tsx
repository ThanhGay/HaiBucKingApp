import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function FirstScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{ color: 'white', fontSize: 26, flex: 1, fontWeight: '700' }}
        >
          HaiBucKing
        </Text>
        <TouchableOpacity style={styles.border}>
          <Image
            source={require('@/assets/icons/translate.png')}
            style={styles.trans}
          />
          <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
            English
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
        <TouchableOpacity style={styles.signin}>
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
        <TouchableOpacity style={styles.signup}>
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
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
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
    marginTop: 45,
    alignItems: 'center',
    gap: 15,
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

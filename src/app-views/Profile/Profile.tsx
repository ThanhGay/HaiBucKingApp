import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import BottomTab from '@/app-navigation/BottomTabs/BottomTab';
import React, { useState } from 'react';
import ChoseLanguage from '../ChoseLanguage/ChoseLanguag';

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
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: '#F2F2F2', fontSize: 16, fontWeight: '700' }}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: '#4A4A4A', marginTop: 24 }} />
    </View>
  );
};

export default function Profile() {
  const Username = 'Đức Thành';
  const [showModal, setshowModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ gap: 24, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ height: 90, width: 90, borderRadius: 90 }}
            source={require('@/assets/icons/translate.png')}
          />
          <Text style={{ color: '#F2F2F2', fontSize: 32, fontWeight: '700' }}>
            {Username}
          </Text>
        </View>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={require('@/assets/icons/arrowright.png')}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <BoxProfile
          link={require('@/assets/icons/translate.png')}
          title="Change language"
          onPress={() => setshowModal(true)}
        />
        <BoxProfile
          link={require('@/assets/icons/translate.png')}
          title="Change password"
          onPress={() => {}}
        />
        <BoxProfile
          link={require('@/assets/icons/translate.png')}
          title="Change language"
          onPress={() => {}}
        />
        <TouchableOpacity
          style={{
            borderRadius: 64,
            marginTop: 40,
            borderColor: 'red',
            borderWidth: 2,
            height: 56,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#FF0000',
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}></View>
      <BottomTab />
      <ChoseLanguage visible={showModal} onClose={() => setshowModal(false)} />

      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
}
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

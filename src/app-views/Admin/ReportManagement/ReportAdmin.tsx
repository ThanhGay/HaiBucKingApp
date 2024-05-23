import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import ByTime from './ByTime';
import ByMovie from './ByMovie';
import ByQuarter from './ByQuarter';
import BottomTabAdmin from '@app-navigation/BottomTabs/BottomTabsAdmin';
import colors from '@/utils/colors';

function ReportAdmin() {
  const [touch, setTouch] = useState(false);
  const [show, setShow] = useState('Choose Report');
  const handleButton = () => {
    setTouch(!touch);
    // console.log(touch);
  };

  const Render = () => {
    switch (show) {
      case 'By Time':
        return <ByTime />;
      case 'By Movie':
        return <ByMovie />;
      case 'By Quarter':
        return <ByQuarter />;
      default:
        return (
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{ marginVertical: 32 }}
              source={require('@assets/logo/Logo-L.png')}
            />
            <Text style={{ color: colors.whiteText, fontSize: 24 }}>
              Please select report type!
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{ fontSize: 32, fontWeight: '700', color: colors.whiteText }}
          >
            Report
          </Text>
          <View style={{ gap: 4 }}>
            <TouchableOpacity
              style={{
                borderColor: 'white',
                borderWidth: 1,
                alignSelf: 'flex-start',
                borderRadius: 8,
              }}
              onPress={handleButton}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.whiteText,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  width: 150,
                }}
              >
                {show}
              </Text>
            </TouchableOpacity>
            {touch && (
              <ScrollView
                horizontal={false}
                style={{
                  alignSelf: 'flex-start',
                  height: 60,
                  //   borderColor: 'white',
                  borderWidth: 1,
                  marginTop: -4,
                  borderRadius: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setTouch(!touch);
                    setShow('By Time');
                    console.log('By Time');
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.whiteText,
                      paddingHorizontal: 8,
                    }}
                  >
                    By Time
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setTouch(!touch);
                    setShow('By Movie');
                    console.log('By Movie');
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.whiteText,
                      paddingHorizontal: 8,
                    }}
                  >
                    By Movie
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setTouch(!touch);
                    setShow('By Quarter');
                    console.log('By Quarter');
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.whiteText,
                      paddingHorizontal: 8,
                    }}
                  >
                    By Quarter
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </View>
      <View style={{ flex: 8 }}>
        <Text
          style={{
            color: colors.primary,
            // backgroundColor: 'red',
            fontSize: 28,
            fontWeight: '500',
            alignSelf: 'flex-start',
          }}
        >
          Report Infomation
        </Text>
        <Render></Render>
      </View>
      <BottomTabAdmin />
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </View>
  );
}
export default ReportAdmin;

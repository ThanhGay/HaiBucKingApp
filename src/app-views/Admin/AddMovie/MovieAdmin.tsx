import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import colors from '@/utils/colors';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';

function MovieAdmin() {
  const [touch, setTouch] = useState(false);
  const [show, setShow] = useState('Choose');
  const handleButton = () => {
    setTouch(!touch);
    // console.log(touch);
  };
  const Render = () => {
    switch (show) {
      case 'Add movie':
        return <AddMovie />;
      case 'Edit movie':
        return <EditMovie />;
      default:
        return (
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{ marginVertical: 32 }}
              source={require('@assets/logo/Logo-L.png')}
            />
            <Text style={{ color: colors.whiteText, fontSize: 24 }}>
              Please choose to
            </Text>
            <Text style={{ color: colors.whiteText, fontSize: 24 }}>
              Create, edit movies
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
            Movie
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
                  height: 65,
                  //   borderColor: 'white',
                  borderWidth: 1,
                  marginTop: -4,
                  borderRadius: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setTouch(!touch);
                    setShow('Add movie');
                    console.log('Add movie');
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.whiteText,
                      paddingHorizontal: 8,
                    }}
                  >
                    Add Movie
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setTouch(!touch);
                    setShow('Edit movie');
                    console.log('Edit movie');
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.whiteText,
                      paddingHorizontal: 8,
                    }}
                  >
                    Edit Movie
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
          {show}
        </Text>
        <Render></Render>
      </View>

      <StatusBar
        backgroundColor={'black'}
        barStyle={'light-content'}
      ></StatusBar>
    </View>
  );
}
export default MovieAdmin;

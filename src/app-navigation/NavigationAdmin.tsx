import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieShowAdmin from '@app-views/Admin/MovieManagement/MovieShowAdmin';
import MovieAdmin from '@app-views/Admin/MovieManagement/MovieAdmin';
import ReportAdmin from '@app-views/Admin/ReportManagement/ReportAdmin';
import CategoryAdmin from '@app-views/Admin/CategoryManagement/CategoryAdmin';

const MainStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const NavigationAdmin = () => {
  return (
    <ReactNavigationContainer>
      <MainStack.Navigator
        initialRouteName="MovieAdmin"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen
          name="MovieAdmin"
          component={MovieAdmin}
        ></MainStack.Screen>
        <MainStack.Screen
          name="MovieShowAdmin"
          component={MovieShowAdmin}
        ></MainStack.Screen>
        <MainStack.Screen
          name="ReportAdmin"
          component={ReportAdmin}
        ></MainStack.Screen>
        <MainStack.Screen
          name="CategoryAdmin"
          component={CategoryAdmin}
        ></MainStack.Screen>
      </MainStack.Navigator>
    </ReactNavigationContainer>
  );
};

export default NavigationAdmin;

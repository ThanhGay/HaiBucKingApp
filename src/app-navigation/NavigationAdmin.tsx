import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieShowAdmin from '@app-views/Admin/MovieManagement/MovieShowAdmin';
import MovieAdmin from '@app-views/Admin/MovieManagement/MovieAdmin';
import ReportAdmin from '@app-views/Admin/ReportManagement/ReportAdmin';
import CategoryAdmin from '@app-views/Admin/CategoryManagement/CategoryAdmin';

const AdminStack = createNativeStackNavigator();
const NavigationAdmin = () => {
  return (
    <ReactNavigationContainer independent={true}>
      <AdminStack.Navigator
        initialRouteName="MovieAdmin"
        screenOptions={{ headerShown: false }}
      >
        <AdminStack.Screen
          name="MovieAdmin"
          component={MovieAdmin}
        ></AdminStack.Screen>
        <AdminStack.Screen
          name="MovieShowAdmin"
          component={MovieShowAdmin}
        ></AdminStack.Screen>
        <AdminStack.Screen
          name="ReportAdmin"
          component={ReportAdmin}
        ></AdminStack.Screen>
        <AdminStack.Screen
          name="CategoryAdmin"
          component={CategoryAdmin}
        ></AdminStack.Screen>
      </AdminStack.Navigator>
    </ReactNavigationContainer>
  );
};

export default NavigationAdmin;

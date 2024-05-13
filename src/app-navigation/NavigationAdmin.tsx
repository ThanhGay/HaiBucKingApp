import React from 'react';
import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CategoryAdmin,
  Home,
  MovieAdmin,
  MovieShowAdmin,
  ReportAdmin,
} from './types';
import NavigationContainer from './NavigationContainer';

const AdminStack = createNativeStackNavigator();
const NavigationAdmin = () => {
  return (
    <ReactNavigationContainer independent={true}>
      <AdminStack.Navigator
        initialRouteName="MovieAdmin"
        screenOptions={{ headerShown: false }}
      >
        <AdminStack.Screen name="MovieAdmin" component={MovieAdmin} />
        <AdminStack.Screen name="MovieShowAdmin" component={MovieShowAdmin} />
        <AdminStack.Screen name="ReportAdmin" component={ReportAdmin} />
        <AdminStack.Screen name="CategoryAdmin" component={CategoryAdmin} />
        <AdminStack.Screen name="Home" component={Home} />
        {/* <AdminStack.Screen name='NavigationContainer' component={NavigationContainer} /> */}
      </AdminStack.Navigator>
    </ReactNavigationContainer>
  );
};

export default NavigationAdmin;

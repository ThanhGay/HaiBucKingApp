import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppScreens } from './navigation-screens';

const MainStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const StackContainer = (props: { route: any }) => {
  const key_screen = props.route.params.keyScreen;
  const stack_screen = AppScreens[key_screen];

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {stack_screen.screens.map((key: any) => {
        const value = stack_screen.screens[key];

        return (
          <Stack.Screen
            key={value.name}
            name={value.name}
            component={value.component}
            options={value.options}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const NavigationContainer = () => {
  return (
    <ReactNavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {/* {(AppScreens).map((key: any) => {
          const value = AppScreens[key];
          return (
            <MainStack.Screen
              key={value.name}
              name={value.name}
              component={value.component ? value.component : StackContainer}
              initialParams={{ keyScreen: key }}
              options={value.options}
            />
          );
        })} */}
        <MainStack.Screen
          name="Login"
          component={require('@app-views/Login/Login').default}
        />
        <MainStack.Screen
          name="Home"
          component={require('@app-views/Home/Home').default}
        />
      </MainStack.Navigator>
    </ReactNavigationContainer>
  );
};

export default NavigationContainer;

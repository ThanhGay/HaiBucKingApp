import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppScreens } from './navigation-screens';
import {
  FirstScreen,
  Home,
  Movie,
  Ticket,
  Profile,
  Signin,
  Signup,
  Splash,
  DetailMovie,
  DetailTicket,
  SelectSeat,
  ConfirmOTP,
  EnterUsername,
  EditProfile,
  Payment,
  Forgotpassword,
  ChangePassword,
} from './types';
import Success from '@/app-views/Success/Success';

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
      <MainStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="First" component={FirstScreen} />
        <MainStack.Screen name="Splash" component={Splash} />
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Movie" component={Movie} />
        <MainStack.Screen name="Ticket" component={Ticket} />
        <MainStack.Screen name="Profile" component={Profile} />
        <MainStack.Screen name="Signin" component={Signin} />
        <MainStack.Screen name="Signup" component={Signup} />
        <MainStack.Screen name="DetailMovie" component={DetailMovie} />
        <MainStack.Screen name="DetailTicket" component={DetailTicket} />
        <MainStack.Screen name="SelectSeat" component={SelectSeat} />
        <MainStack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <MainStack.Screen name="EnterUsername" component={EnterUsername} />
        <MainStack.Screen name="EditProfile" component={EditProfile} />
        <MainStack.Screen name="Payment" component={Payment} />
        <MainStack.Screen name="ForgotPassword" component={Forgotpassword} />
        <MainStack.Screen name="ChangePassword" component={ChangePassword} />
        <MainStack.Screen name="Success" component={Success}></MainStack.Screen>
      </MainStack.Navigator>
    </ReactNavigationContainer>
  );
};

export default NavigationContainer;

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
  Success,
  History,

  //Admin
  CategoryAdmin,
  MovieAdmin,
  MovieShowAdmin,
  ReportAdmin,
} from './types';
import NavigationAdmin from './NavigationAdmin';

const MainStack = createNativeStackNavigator();

const NavigationContainer = () => {
  return (
    <ReactNavigationContainer independent={true}>
      <MainStack.Navigator
        // initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Splash" component={Splash} />
        <MainStack.Screen name="FirstScreen" component={FirstScreen} />
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
        <MainStack.Screen name="Success" component={Success} />
        <MainStack.Screen name="History" component={History} />

        {/* Admin */}
        <MainStack.Screen name="MovieAdmin" component={MovieAdmin} />
        <MainStack.Screen name="MovieShowAdmin" component={MovieShowAdmin} />
        <MainStack.Screen name="ReportAdmin" component={ReportAdmin} />
        <MainStack.Screen name="CategoryAdmin" component={CategoryAdmin} />
        {/* <MainStack.Screen name="NavigationAdmin" component={NavigationAdmin} /> */}
      </MainStack.Navigator>
    </ReactNavigationContainer>
  );
};

export default NavigationContainer;

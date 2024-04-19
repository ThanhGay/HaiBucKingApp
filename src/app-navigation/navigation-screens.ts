const LoginScreen = {
  Signin: {
    name: 'Signin',
    component: require('@app-views/Signin/Signin').default,
  },
  Signup: {
    name: 'Signup',
    component: require('@app-views/Signup/Signup').default,
  },
  ForgotPassword: {
    name: 'ForgetPassword',
    component: require('@app-views/Password/ForgotPassword').default,
  },
  ConfirmOTP: {
    name: 'ConfirmOTP',
    component: require('@app-views/ConfirmOTP/ConfirmOTP').default,
  }
};

const MainScreen = {
  Home: {
    name: 'Home',
    component: require('@app-views/Home/Home').default,
  },
  Ticket: {
    name: 'Ticket',
    component: require('@app-views/Ticket/Ticket').default,
  },
  Movie: {
    name: 'Movie',
    component: require('@app-views/Movie/Movie').default,
  },
  Profile: {
    name: 'Profile',
    component: require('@app-views/Profile/Profile').default,
  }
};

const AppScreens: Record<any, any> = {
  Splash: {
    name: 'Splash',
    component: require('@app-views/Splash/Splash').default,
  },
  LoginApp: {
    name: 'LoginApp',
    screens: LoginScreen,
  },
  MainApp: {
    name: 'MainApp',
    screens: MainScreen,
  },
};

export { AppScreens };

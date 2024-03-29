const LoginScreen = {
  Login: {
    name: 'Login',
    component: require('@app-views/Login/Login').default,
  },
  Register: {
    name: 'Register',
    component: require('@app-views/Register/Register').default,
  },
  ForgotPassword: {
    name: 'ForgetPassword',
    component: require('@app-views/Password/ForgotPassword').default,
  },
  ResetPassword: {
    name: 'ResetPassword',
    component: require('@app-views/Password/ResetPassword').default,
  },
};

const MainScreen = {
  Home: {
    name: 'Home',
    component: require('@app-views/Home/Home').default,
  },
};

const AppScreens: Record<any, any> = {
  Splash: {
    name: 'Splash',
    component: require('@app-views/Splash/Splash').default,
  },
  MainApp: {
    name: 'MainApp',
    screens: MainScreen,
  },
  LoginApp: {
    name: 'LoginApp',
    screens: LoginScreen,
  },
};

export { AppScreens };

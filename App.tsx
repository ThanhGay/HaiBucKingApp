import RootComponent from '@app-views/RootComponent';
import NavigationContainer from '@app-navigation/NavigationContainer';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <RootComponent>
      <NavigationContainer />
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
    </RootComponent>
  );
};

export default App;

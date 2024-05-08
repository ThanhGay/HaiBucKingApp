import RootComponent from '@app-views/RootComponent';
import NavigationContainer from '@app-navigation/NavigationContainer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigationAdmin from '@app-navigation/NavigationAdmin';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RootComponent>
      <NavigationContainer />
    </RootComponent>
    // <NavigationAdmin />
  );
};

export default App;

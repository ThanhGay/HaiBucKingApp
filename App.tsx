import RootComponent from '@app-views/RootComponent';
import NavigationContainer from '@app-navigation/NavigationContainer';
import ReportAdmin from '@app-views/Admin/Report/ReportAdmin';
import CategoryAdmin from '@app-views/Admin/AddMovie/CategoryAdmin';
import AddMovie from '@app-views/Admin/AddMovie/AddMovie';
import MovieAdmin from '@app-views/Admin/AddMovie/MovieAdmin';
import MovieShowAdmin from '@app-views/Admin/AddMovie/MovieShowAdmin';
import NavigationAdmin from '@app-navigation/NavigationAdmin';

const App = () => {
  return (
    // <RootComponent>
    //   <NavigationContainer />
    // </RootComponent>
    <NavigationAdmin />
  );
};

export default App;

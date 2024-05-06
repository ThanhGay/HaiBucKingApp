import RootComponent from '@app-views/RootComponent';
import NavigationContainer from '@app-navigation/NavigationContainer';
import ReportAdmin from '@app-views/Admin/ReportManagement/ReportAdmin';
import CategoryAdmin from '@app-views/Admin/CategoryManagement/CategoryAdmin';
import MovieAdmin from '@app-views/Admin/MovieManagement/MovieAdmin';
import MovieShowAdmin from '@app-views/Admin/MovieManagement/MovieShowAdmin';
import AddMovie from '@app-views/Admin/MovieManagement/AddMovie';

const App = () => {
  return (
    // <RootComponent>
    //   <NavigationContainer />
    // </RootComponent>
    <CategoryAdmin />
  );
};

export default App;

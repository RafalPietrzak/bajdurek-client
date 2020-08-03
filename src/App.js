import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/views/Home/Home';
import Cart from './components/views/Cart/CartContainer';
import Configurator from './components/views/Configurator/Configurator';
import Detail from './components/views/Detail/DetailContainer';
import StoryShelf from './components/views/StoryShelf/StoryShelf';
import Story from './components/views/Story/StoryContainer';
import NoPermission from './components/views/NoPermission/NoPermission';
import { Alert } from '@material-ui/lab';


class App extends React.Component {
  componentDidMount() {
    const { fetchUserData } = this.props;
    fetchUserData();
  }
  checkIsLogged() {
    const { loadingUserData, userData, getIsLogged } = this.props;
    if (
      (loadingUserData.active)
      || !userData
      || !getIsLogged
    ) {
      return false;
    } else if (loadingUserData.error) {
      return (
        <Alert severity="error">Error!</Alert>
      );
    } else {
      return true
    }
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Story' component={Story} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/detail/:id' component={Detail} />
              <Route exact path='/no-permission' component={NoPermission} />
              <Route exact path='/story-shelf' render={
                () => this.checkIsLogged() === true
                  ? <StoryShelf /> : <NoPermission />
              } />
              <Route exact path='/configurator' render={
                () => this.checkIsLogged() === true
                  ? <Configurator /> : <NoPermission />
              } />
            </Switch>
          </MainLayout>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
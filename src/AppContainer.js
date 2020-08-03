
import { connect } from 'react-redux';
import App from './App';
import {
  redirectAuthGoogle, redirectAuthGoogleLogout, 
  fetchUserDataFromAPI, getUserData, getLoadingUserData, getIsLogged
} from './redux/userRedux';

const mapStateToProps = state => ({
  userData: getUserData(state), 
  loadingUserData: getLoadingUserData(state),
  getIsLogged: getIsLogged(state)
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchUserData: () => dispatch(fetchUserDataFromAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

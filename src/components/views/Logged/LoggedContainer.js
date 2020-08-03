import { connect } from 'react-redux';
import Logged from './Logged';
import { 
  fetchUserDataFromAPI, getUserData, getLoadingUserData
} from '../../../redux/userRedux';

const mapStateToProps = (state) => ({
  userData: getUserData(state), 
  loadingUserData: getLoadingUserData(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserData: () => dispatch(fetchUserDataFromAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Logged);
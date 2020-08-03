
import { connect } from 'react-redux';
import Header from './Header';
import {
  redirectAuthGoogle, redirectAuthLogout, getIsLogged, countCart, countStoryShelf
} from '../../../redux/userRedux';

const mapStateToProps = state => ({
  isLogged: getIsLogged(state),
  countStoryShelf: countStoryShelf(state),
  countCart: countCart(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  redirectAuthGoogle: () => dispatch(redirectAuthGoogle()),
  redirectAuthLogout: () => dispatch(redirectAuthLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

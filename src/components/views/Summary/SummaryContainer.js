import { connect } from 'react-redux';
import Summary from './Summary';
import { 
  addToCart, getAllStoryDetailFromCart, removeFromCart, sendOrder, checkIsLogged
} from '../../../redux/userRedux';
import {config, getConfig} from '../../../redux/paymentRedux';

const mapStateToProps = (state) => ({
  storyDetail: getAllStoryDetailFromCart(state), 
  checkIsLogged: checkIsLogged(state),
  config: getConfig(state),
});
const mapDispatchToProps = (dispatch) => ({
  addToCart: (number) => dispatch(addToCart(number)),
  removeFromCart: (_id) => dispatch(removeFromCart(_id)),
  sendOrder: () => dispatch(sendOrder()),
  setConfig: (data) => dispatch(config(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Summary);
import { connect } from 'react-redux';
import Cart from './Cart';
import { 
  addToCart, getAllStoryDetailFromCart, removeFromCart, sendOrder
} from '../../../redux/userRedux';

const mapStateToProps = (state) => ({
  storyDetail: getAllStoryDetailFromCart(state), 
});
const mapDispatchToProps = (dispatch) => ({
  addToCart: (number) => dispatch(addToCart(number)),
  removeFromCart: (_id) => dispatch(removeFromCart(_id)),
  sendOrder: () => dispatch(sendOrder()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
import { connect } from 'react-redux';
import Story from './Story';
import { getAllStory, fetchStoryFromAPI, getLoadingStoryState } from '../../../redux/storyRedux';
import { addToCart } from '../../../redux/userRedux';
import { fetchDetailFromAPI, fetchDetailIfNot } from '../../../redux/storyDetailRedux';

const mapStateToProps = (state) => ({
  story: getAllStory(state), 
  loadingStory: getLoadingStoryState(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchStory: () => dispatch(fetchStoryFromAPI()),
  fetchDetail: (_id) => dispatch(fetchDetailFromAPI(_id)),
  addToCart: (number) => dispatch(addToCart(number)),
  fetchDetailIfNot: (_id) => dispatch(fetchDetailIfNot(_id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Story);
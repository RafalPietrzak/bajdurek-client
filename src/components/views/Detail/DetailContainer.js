import { connect } from 'react-redux';
import Detail from './Detail';
import { 
  getDetailById, getLoadingDetailState, fetchDetailFromAPI, fetchReset
} from '../../../redux/storyDetailRedux';

const mapStateToProps = (state, props) => ({
  detail: getDetailById(state, props.match.params.id), 
  loadingDetail: getLoadingDetailState(state),
});
const mapDispatchToProps = (dispatch, props) => ({
  fetchDetail: () => dispatch(fetchDetailFromAPI(props.match.params.id)),
  fetchReset: () => dispatch(fetchReset()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
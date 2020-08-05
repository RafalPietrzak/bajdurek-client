import { connect } from 'react-redux';
import Payment from './Payment';
import { 
  getAdyenConfig, getPaymentMethods, initiatePayment, submitAdditionalDetails,
  getPayment
} from '../../../redux/paymentRedux';

const mapStateToProps = (state) => ({
    payment: getPayment(state), 
    type: 'dropin',
});
const mapDispatchToProps = (dispatch) => ({
  getAdyenConfig: () => dispatch(getAdyenConfig()),
  getPaymentMethods: (data) => dispatch(getPaymentMethods(data)),
  initiatePayment: (data) => dispatch(initiatePayment(data)),
  submitAdditionalDetails: (data) => dispatch(submitAdditionalDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
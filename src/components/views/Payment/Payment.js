import React from 'react';
import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Progress from '../../common/Progress/Progress'
import useStyles from './Payment.css';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.paymentContainer = React.createRef();
    this.paymentComponent = null;
  }
  componentDidMount() {
    const {getAdyenConfig, getPaymentMethods, payment} = this.props;
    getAdyenConfig();
    getPaymentMethods({
      amount: payment.config.paymentMethodsConfiguration.card.amount,
      countryCode: payment.config.paymentMethodsConfiguration.card.countryCode,
    });
  }
  componentDidUpdate(prevProps) {
    const { paymentMethodsRes: paymentMethodsResponse, config, paymentRes, paymentDetailsRes, error } = this.props.payment;
    if (error && error !== prevProps.payment.error) {
      window.location.href = `/status/error?reason=${error}`;
      return;
    }
    if (
      paymentMethodsResponse &&
      config &&
      (paymentMethodsResponse !== prevProps.payment.paymentMethodsRes || config !== prevProps.payment.config)
    ) {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      this.checkout = new AdyenCheckout({
        ...config,
        paymentMethodsResponse,
        onAdditionalDetails: this.onAdditionalDetails,
        onSubmit: this.onSubmit
      });

      this.checkout.create(this.props.type).mount(this.paymentContainer.current);
    }
    if (paymentRes && paymentRes !== prevProps.payment.paymentRes) {
      this.processPaymentResponse(paymentRes);
    }
    if (paymentRes && paymentDetailsRes !== prevProps.payment.paymentDetailsRes) {
      this.processPaymentResponse(paymentDetailsRes);
    }
  }
  onSubmit = (state, component) => {
    const { billingAddress } = this.props.payment;
    console.log('state', state);
    console.log('component:', component);
    console.log('billingAddress:', billingAddress);
    if (state.isValid) {
      this.props.initiatePayment({
        ...state.data,
        billingAddress: this.props.type === "card" && billingAddress.enableBilling ? billingAddress : null,
        origin: window.location.origin
      });
      this.paymentComponent = component;
    }
  }
  onAdditionalDetails = (state, component) => {
    this.props.submitAdditionalDetails(state.data);
    this.paymentComponent = component;
  }
  processPaymentResponse = (paymentRes) => {
    if (paymentRes.action) {
      this.paymentComponent.handleAction(paymentRes.action);
    } else {
      switch (paymentRes.resultCode) {
        case "Authorised":
          window.location.href = "/status/success";
          break;
        case "Pending":
          window.location.href = "/status/pending";
          break;
        case "Refused":
          window.location.href = "/status/failed";
          break;
        default:
          window.location.href = "/status/error";
          break;
      }
    }
  }
  render() {
    //const classes = useStyles();

    return (
      <div className="payment-container">
        <div ref={this.paymentContainer} className="payment"></div>
      </div>
    );
  }
}

export default Payment;
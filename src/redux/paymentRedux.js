import Axios from 'axios';
import { api } from "../settings";

Axios.defaults.withCredentials = true;

/* selectors */
export const getPayment = ({ payment }) => payment;
export const getConfig = ({payment}) => payment.config;

/* action name creator */
const reducerName = 'payment';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET_BILLING = createActionName('SET_BILLING');
const CONFIG = createActionName('CONFIG');
const PAYMENT_METHODS = createActionName('PAYMENT_METHODS');
const PAYMENTS = createActionName('PAYMENTS');
const PAYMENT_DETAILS = createActionName('PAYMENT_DETAILS');

/* action creators */
export const setBilling = payload => ({ payload, type: SET_BILLING })
export const config = payload => ({ payload, type: CONFIG });
export const paymentMethods = payload => ({ payload, type: PAYMENT_METHODS });
export const payments = payload => ({ payload, type: PAYMENTS });
export const paymentDetails = payload => ({ payload, type: PAYMENT_DETAILS });

/* thunk creators */
export const getAdyenConfig = () => {
  return (dispatch, getState) => {
    Axios.get(`${api.url}/${api.user}/config`).then(
      (res) => {
        dispatch(config(res.data))
      }
    ).catch(err => {
      console.log(err);
    })
  }
}
export const getPaymentMethods = (data) => {
  return (dispatch, getState) => {
    Axios.post(`${api.url}/${api.user}/getPaymentMethods`, data).then(
      (res) => {
        dispatch(paymentMethods([res.data, res.status]))
      }).catch(err => {
          console.log(err);
      }
    )
  }
}

export const initiatePayment = data => {
  return (dispatch, getState) => {
    Axios.post(
      `${api.url}/${api.user}/initiatePayment`, data
    ).then(
      (res) => {
        dispatch(payments([res.data, res.status]))
      }
    ).catch(err => {
          console.log(err);
    })
  }
}
export const submitAdditionalDetails = data => {
  return (dispatch, getState) => {
    Axios.post(
      `${api.url}/${api.user}/submitAdditionalDetails`, data
    ).then(
      (res) => {
        dispatch(paymentDetails([res.data, res.status]))
      }
    ).catch(err => {
          console.log(err);
    })
  }
}

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case SET_BILLING: {
      return {
        ...statePart,
        billingAddress: {
          ...statePart.billingAddress,
          ...action.payload
        }
      };
    }
    case CONFIG: {
      return {
        ...statePart,
        config: {
          ...statePart.config,
          ...action.payload
        }
      };
    }
    case PAYMENT_METHODS: {
      const [res, status] = action.payload;
      if (status >= 300) {
        return { ...statePart, error: res }
      } else {
        return { ...statePart , paymentMethodsRes: res }
      }
    }
    case PAYMENTS: {
      const [res, status] = action.payload;
      if (status >= 300) {
        return { ...statePart, error: res }
      } else {
        return { ...statePart, paymentRes: res }
      }
    }
    case PAYMENT_DETAILS: {
      const [res, status] = action.payload;
      if (status >= 300) {
        return { ...statePart, error: res }
      } else {
        return { ...statePart, paymentDetailsRes: res }
      }
    }
    default:
      return statePart;
  }
}
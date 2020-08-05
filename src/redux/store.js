import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import globalReducer from './globalRedux';
import storyReducer from './storyRedux';
import storyDetailReducer from './storyDetailRedux'
import userReducer from './userRedux';
import paymentReducer from './paymentRedux';

// define initial state and shallow-merge initial data
const initialState = {
  story: {
    data: [],
    loading: {
      active: false,
      error: false,
      type: 'after fetch',
    },
  },
  storyDetail: {
    data: [],
    loading: {
      active: false,
      error: false,
      type: 'after fetch',
    },
  },
  user: {
    isLogged: false,
    data: {
      cart: [],
      storyShelf: []
    },
    loading: {
      active: false,
      error: false,
      type: 'after fetch',
    },
  },
  payment: {
    error: '',
    paymentMethodsRes: null,
    paymentRes: null,
    paymentDetailsRes: null,
    config: {
      paymentMethodsConfiguration: {
        ideal: {
          showImage: true
        },
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          name: 'Credit or debit card',
          countryCode: 'US',
          amount: {
            value: 0, 
            currency: 'USD'
          }
        }
      },
      locale: 'pl_PL',
      showPayButton: true
    },
    billingAddress: {
      enableBilling: false,
      firstName: 'Joe',
      lastName: 'Bob',
      houseNumberOrName: '274',
      street: 'Brannan Street',
      city: 'San Francisco',
      stateOrProvince: 'California',
      postalCode: '94107',
      country: 'US'
    }
  }
};

// define reducers
const reducers = {
  story: storyReducer,
  storyDetail: storyDetailReducer,
  user: userReducer,
  payment: paymentReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] === 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

// combine reducers
const combinedReducers = combineReducers(reducers);

// merge all reducers with globalReducer
const storeReducer = (state, action) => {
  const modifiedState = globalReducer(state, action);
  return combinedReducers(modifiedState, action);
};

// create store
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
import Axios from 'axios';
import { api } from "../settings";
Axios.defaults.withCredentials = true;

/* selectors */
export const getUserData = ({ user }) => user.data;
export const getLoadingUserData = ({ user }) => user.loading;
export const getIsLogged = ({ user }) => user.isLogged;
export const countCart = ({ user }) => user.data.cart ? user.data.cart.length : 0;
export const getCart = ({ user }) => user.data.cart;
export const getStoryShelf = ({user}) => user.data.storyShelf;
export const countStoryShelf = ({user}) => user.data.storyShelf ? user.data.storyShelf.length : 0;
export const getAllStoryDetailFromCart = ({user, storyDetail}) => user.data.cart 
  ? user.data.cart.map( cartItem => {
    const sto = storyDetail.data.find(
       storyDetailItem => storyDetailItem._id === cartItem._id
    )
    sto.count = cartItem.count
    return sto;
  }) 
  : [] ;

/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const SET_IS_LOGGED = createActionName('SET_IS_LOGGED');
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const BAY_END_PAY = createActionName('BAY_END_PAY')

/* action creators */
export const fetchUserDataStarted = payload => ({ payload, type: FETCH_START });
export const fetchUserDataSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchUserDataError = payload => ({ payload, type: FETCH_ERROR });
export const setIsLogged = payload => ({ payload, type: SET_IS_LOGGED });
export const addToCart = payload => ({ payload, type: ADD_TO_CART});
export const removeFromCart = payload => ({payload, type: REMOVE_FROM_CART})
/* thunk creators */
export const redirectAuthGoogle = () => {
  return () => {
    window.open(`${api.url}/auth/google`, '_self');
  }
}
export const redirectAuthLogout = () => {
  return () => {
    setIsLogged(false);
    window.open(`${api.url}/auth/logout`, '_self');
  }
}
export const fetchUserDataFromAPI = (userId) => {
  return (dispatch, getState) => {
    dispatch(fetchUserDataStarted());
    Axios
      .get(`${api.url}/${api.user}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "same-origin"
        }
      )
      .then(res => {
        dispatch(fetchUserDataSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchUserDataError(err.message || true));
      });
  };
};
export const sendOrder = () => {
  return (dispatch, getState) =>{
      const {user} = getState();
     Axios.post(`${api.url}/${api.user}/new-order`, user.data.cart).then(res => {
       console.log(res.data)
     }).catch(err => {
       console.log(err.message)
     });
  } 
}
/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        isLogged: true,
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case SET_IS_LOGGED: {
      return {
        ...statePart,
        isLogged: action.payload,
      }
    }
    case ADD_TO_CART: {
      const newCart = [...statePart.data.cart];
      const index = newCart.findIndex(item => {
        return item._id === action.payload._id
      } );
      if(index >= 0) {
        newCart[index].count += action.payload.count; 
      } else {
        newCart.push(action.payload);
      }
      return {
        ...statePart,
        data: {
          ...statePart.data,
          cart: newCart
        }
      }
    }
    case REMOVE_FROM_CART: {
      const newCart = statePart.data.cart.reduce(
      (newArray, item) => {
        if(item._id !== action.payload){
          newArray.push(item)
        }
        return newArray;
      }, [])
      return {
        ...statePart,
        data: {
          ...statePart.data,
          cart: newCart
        }
      }
    }
    default:
      return statePart;
  }
}
import Axios from 'axios';
import { api } from "../settings";

/* selectors */
export const getAllDetail = ({ storyDetail }) => storyDetail.data;
export const getDetailById = ({ storyDetail }, id) => storyDetail.data.find(
  story => story._id === id
);
export const getLoadingDetailState = ({ story }) => story.loading;

/* action name creator */
const reducerName = 'storyDetail';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_RESET = createActionName('FETCH_RESET');
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchReset = payload => ({ payload, type: FETCH_RESET });
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchDetailFromAPI = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get(`${api.url}/${api.story}/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};
export const fetchDetailIfNot = (id) => {
  return (dispatch, getState) => {
    const { storyDetail } = getState();
    const index = storyDetail.data.findIndex((item) => {
      return item._id === id;
    });
    if (index < 0) {
      dispatch(fetchStarted());
      Axios
        .get(`${api.url}/${api.story}/${id}`)
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  }
}
  /* reducer */
  export default function reducer(statePart = [], action = {}) {
    switch (action.type) {
      case FETCH_RESET: {
        return {
          ...statePart,
          loading: {
            active: false,
            error: false,
          },
        };
      }
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
        const newData = [...statePart.data];
        newData.push(action.payload);
        return {
          ...statePart,
          loading: {
            active: false,
            error: false,
          },
          data: newData,
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
      default:
        return statePart;
    }
  }
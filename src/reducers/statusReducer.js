import { FETCH_STATUS_REQUEST, FETCH_STATUS_SUCCESS, FETCH_STATUS_FAILURE } from '../actions/types';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATUS_REQUEST:
      return { ...state, loading: true };
    case FETCH_STATUS_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default statusReducer;

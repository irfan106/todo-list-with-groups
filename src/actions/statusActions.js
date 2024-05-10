import axios from 'axios';
import { FETCH_STATUS_REQUEST, FETCH_STATUS_SUCCESS, FETCH_STATUS_FAILURE } from './types';

export const fetchStatus = () => async (dispatch) => {
  dispatch({ type: FETCH_STATUS_REQUEST });
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    dispatch({ type: FETCH_STATUS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_STATUS_FAILURE, payload: error.message });
  }
};

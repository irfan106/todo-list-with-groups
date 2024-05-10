import { ADD_GROUP, DELETE_GROUP, UPDATE_UPPER_LIMIT } from '../actions/types';

const initialState = [{ from: 1, to: 10 }];

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      const lastGroup = state[state.length - 1];
      const from = lastGroup ? lastGroup.to + 1 : 1;
      const to = action.payload.to;

      if (from > to || to > 10) {
        return state;
      }

      return [...state, { from, to }];

    case DELETE_GROUP:
      return state.filter((group, index) => index !== action.payload);

    case UPDATE_UPPER_LIMIT:
      return state.map((group, index) =>
        index === action.payload.index ? { ...group, to: action.payload.newUpperLimit } : group
      );

    default:
      return state;
  }
};

export default groupsReducer;

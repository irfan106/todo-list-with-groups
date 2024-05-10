import { ADD_GROUP, DELETE_GROUP, UPDATE_UPPER_LIMIT } from './types';

export const addGroup = (to) => ({
  type: ADD_GROUP,
  payload: { to },
});

export const deleteGroup = (groupId) => ({
  type: DELETE_GROUP,
  payload: groupId,
});

export const updateUpperLimit = (index, newUpperLimit) => ({
  type: UPDATE_UPPER_LIMIT,
  payload: { index, newUpperLimit },
});

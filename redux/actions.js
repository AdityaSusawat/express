import * as actions from "./actionTypes.js";

export const addedBug = (description) => ({
  type: actions.ADD_BUG,
  payload: {
    description,
  },
});

export const removedBug = (id) => ({
  type: actions.REMOVE_BUG,
  payload: {
    id,
  },
});

export const toggleBug = (id) => ({
  type: actions.TOGGLE_BUG,
  payload: {
    id,
  },
});

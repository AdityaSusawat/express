import * as actions from "./actionTypes.js";

let lastID = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.ADD_BUG:
      return [
        ...state,
        {
          id: ++lastID,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.REMOVE_BUG:
      return state.filter((bug) => bug.id != action.payload.id);

    case actions.TOGGLE_BUG:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: !bug.resolved } : bug
      );

    default:
      return state;
  }
}

import store from "./redux/store.js";
import {
  addedBug,
  removedBug,
  toggleBug,
  updatedBug,
} from "./redux/actions.js";

const unsubscribe = store.subscribe(() => {
  console.log("Current state: ", store.getState());
});

store.dispatch(addedBug("Bug1"));
store.dispatch(addedBug("Bug2"));
store.dispatch(addedBug("Bug3"));
store.dispatch(removedBug(3));
store.dispatch(toggleBug(1));
store.dispatch(updatedBug(2, "Bug Update"));

unsubscribe();

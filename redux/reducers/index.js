import { combineReducers } from "redux";
import { navReducer } from "./navReducer";

const reducers = combineReducers({
  navReducer: navReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;

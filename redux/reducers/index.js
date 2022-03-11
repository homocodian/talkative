import { combineReducers } from "redux";
import { meetingReducer } from "./meetingReducer";
import { navReducer } from "./navReducer";
import { notificationReducer } from "./notificationReducer";

const reducers = combineReducers({
  navReducer: navReducer,
  meetingReducer: meetingReducer,
  notificationReducer: notificationReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;

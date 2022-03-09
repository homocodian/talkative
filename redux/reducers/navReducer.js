const initialState = {
  activeTab: "home",
};

export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_ACTIVE_TAB": {
      let newState = { ...state };
      newState.activeTab = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

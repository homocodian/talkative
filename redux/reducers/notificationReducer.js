const initialState = {
  isOpen: false,
  message: null,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE": {
      let newState = { ...state };
      newState.isOpen = action.payload.isOpen || newState.isOpen;
      newState.message = action.payload.message || newState.message;
      return newState;
    }
    case "RESET_MESSAGE": {
      return {
        isOpen: false,
        message: null,
      };
    }
    default:
      return state;
  }
};

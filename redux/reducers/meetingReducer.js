const initailState = {
  isMeetingStarted: false,
  displayName: null,
  meetingId: null,
  meetingPasscode: null,
  meetingTitle: null,
  id: null,
};

export const meetingReducer = (state = initailState, action) => {
  switch (action.type) {
    case "MEETING_DETAILS": {
      let newState = { ...state };
      Object.keys(action.payload).forEach((key) => {
        newState[key] = action.payload[key];
      });
      return newState;
    }

    case "RESET_MEETING": {
      let newState = {
        isMeetingStarted: false,
        displayName: null,
        meetingId: null,
        meetingPasscode: null,
        meetingTitle: null,
      };
      return newState;
    }

    default:
      return state;
  }
};

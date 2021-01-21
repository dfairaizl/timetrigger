const initialState = {
  auth: {
    hasAuthStatus: false,
  },
  credentials: {},
  account: {},
  timeJobs: [],
  targets: [],
  ui: {
    triggerDialogOpen: false,
    keysDialogOpen: false,
    targetDialogOpen: false,
  },
};

export default function authReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case "UPDATE_AUTH_STATUS":
      return {
        ...newState,
        auth: {
          hasAuthStatus: true,
          isAuthenticated: !!action.user,
          user: action.user,
        },
      };
    case "UPDATE_ACCOUNT":
      return {
        ...newState,
        account: action.account,
      };
    case "UPDATE_API_CREDENTIALS":
      return {
        ...newState,
        credentials: action.credentials,
      };
    case "TOGGLE_TRIGGER_DIALOG":
      return {
        ...newState,
        ui: {
          ...newState.ui,
          triggerDialogOpen: action.open,
        },
      };
    case "TOGGLE_KEYS_DIALOG":
      return {
        ...newState,
        ui: {
          ...newState.ui,
          keysDialogOpen: action.open,
        },
      };
    case "TOGGLE_NEW_TARGET_DIALOG":
      return {
        ...newState,
        ui: {
          ...newState.ui,
          targetDialogOpen: action.open,
        },
      };
    case "TOGGLE_EDIT_TARGET_DIALOG":
      return {
        ...newState,
        ui: {
          ...newState.ui,
          targetDialogOpen: action.open,
          selectedTarget: action.target,
        },
      };
    case "ADD_TIME_TRIGGER_JOB":
      return {
        ...newState,
        timeJobs: [...newState.timeJobs, action.trigger],
      };
    case "UPDATE_TIME_TRIGGER_JOB":
      return {
        ...newState,
        timeJobs: newState.timeJobs.map((i) => {
          if (i.id === action.trigger.id) {
            return action.trigger;
          }

          return i;
        }),
      };
    case "DELETE_TIME_TRIGGER_JOB":
      return {
        ...newState,
        timeJobs: newState.timeJobs.filter((i) => i.id !== action.trigger.id),
      };
    case "ADD_TARGET":
      return {
        ...newState,
        targets: [...newState.targets, action.target],
      };
    case "UPDATE_TARGET":
      return {
        ...newState,
        targets: newState.targets.map((i) => {
          if (i.id === action.target.id) {
            return action.target;
          }

          return i;
        }),
      };
    case "DELETE_TARGET":
      return {
        ...newState,
        targets: newState.targets.filter((i) => i.id !== action.target.id),
      };
    default:
      return newState;
  }
}

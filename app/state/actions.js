export const UPDATE_AUTH_STATUS = 'UPDATE_AUTH_STATUS';
export const TOGGLE_TRIGGER_DIALOG = 'TOGGLE_TRIGGER_DIALOG';
export const TOGGLE_KEYS_DIALOG = 'TOGGLE_KEYS_DIALOG';
export const TOGGLE_TARGET_DIALOG = 'TOGGLE_TARGET_DIALOG';

export const ADD_TIME_TRIGGER_JOB = 'ADD_TIME_TRIGGER_JOB';
export const UPDATE_TIME_TRIGGER_JOB = 'UPDATE_TIME_TRIGGER_JOB';
export const DELETE_TIME_TRIGGER_JOB = 'DELETE_TIME_TRIGGER_JOB';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

export const UPDATE_API_CREDENTIALS = 'UPDATE_API_CREDENTIALS';

export const ADD_TARGET = 'ADD_TARGET';
export const UPDATE_TARGET = 'UPDATE_TARGET';
export const DELETE_TARGET = 'DELETE_TARGET';

export function updateAuthStatus (status) {
  return {
    type: UPDATE_AUTH_STATUS,
    user: status
  };
}

export function toggleTriggerDialog (open) {
  return {
    type: TOGGLE_TRIGGER_DIALOG,
    open
  };
}

export function toggleKeysDialog (open) {
  return {
    type: TOGGLE_KEYS_DIALOG,
    open
  };
}

export function toggleTargetDialog (open) {
  return {
    type: TOGGLE_TARGET_DIALOG,
    open
  };
}

export function addTimeTrigger (trigger) {
  return {
    type: ADD_TIME_TRIGGER_JOB,
    trigger
  };
}

export function updateTimeTrigger (trigger) {
  return {
    type: UPDATE_TIME_TRIGGER_JOB,
    trigger
  };
}

export function deleteTimeTrigger (trigger) {
  return {
    type: DELETE_TIME_TRIGGER_JOB,
    trigger
  };
}

export function updateAccount (account) {
  return {
    type: UPDATE_ACCOUNT,
    account
  };
}

export function updateAPICredentials (credentials) {
  return {
    UPDATE_API_CREDENTIALS,
    credentials
  };
}

export function addTarget (target) {
  return {
    type: ADD_TARGET,
    target
  };
}

export function updateTarget (target) {
  return {
    type: UPDATE_TARGET,
    target
  };
}

export function deleteTarget (target) {
  return {
    type: DELETE_TARGET,
    target
  };
}

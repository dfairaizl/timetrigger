export const UPDATE_AUTH_STATUS = "UPDATE_AUTH_STATUS";
export const TOGGLE_TRIGGER_DIALOG = "TOGGLE_TRIGGER_DIALOG";
export const TOGGLE_KEYS_DIALOG = "TOGGLE_KEYS_DIALOG";
export const TOGGLE_NEW_TARGET_DIALOG = "TOGGLE_NEW_TARGET_DIALOG";
export const TOGGLE_EDIT_TARGET_DIALOG = "TOGGLE_EDIT_TARGET_DIALOG";

export const ADD_TIME_TRIGGER_JOB = "ADD_TIME_TRIGGER_JOB";
export const UPDATE_TIME_TRIGGER_JOB = "UPDATE_TIME_TRIGGER_JOB";
export const DELETE_TIME_TRIGGER_JOB = "DELETE_TIME_TRIGGER_JOB";

export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";

export const UPDATE_API_CREDENTIALS = "UPDATE_API_CREDENTIALS";

export const ADD_TARGET = "ADD_TARGET";
export const UPDATE_TARGET = "UPDATE_TARGET";
export const DELETE_TARGET = "DELETE_TARGET";

export const SET_SUBSCRIPTION_PLAN = "SET_SUBSCRIPTION_PLAN";
export const SET_PORTAL_URL = "SET_PORTAL_URL";
export const SET_CURRENT_SUBSCRIPTION = "SET_CURRENT_SUBSCRIPTION";

export function setSubscriptionPlan(docId, plan) {
  return {
    type: SET_SUBSCRIPTION_PLAN,
    plan,
    planId: docId,
  };
}

export function setPortalURL(url) {
  return {
    type: SET_PORTAL_URL,
    portalUrl: url,
  };
}

export function setCurrentSubscription(planData) {
  return {
    type: SET_CURRENT_SUBSCRIPTION,
    plan: planData,
  };
}

export function updateAuthStatus(status) {
  return {
    type: UPDATE_AUTH_STATUS,
    user: status,
  };
}

export function toggleTriggerDialog(open) {
  return {
    type: TOGGLE_TRIGGER_DIALOG,
    open,
  };
}

export function toggleKeysDialog(open) {
  return {
    type: TOGGLE_KEYS_DIALOG,
    open,
  };
}

export function toggleNewTargetDialog(open) {
  return {
    type: TOGGLE_NEW_TARGET_DIALOG,
    open,
  };
}

export function toggleEditTargetDialog(open, target) {
  return {
    type: TOGGLE_EDIT_TARGET_DIALOG,
    open,
    target,
  };
}

export function addTimeTrigger(trigger) {
  return {
    type: ADD_TIME_TRIGGER_JOB,
    trigger,
  };
}

export function updateTimeTrigger(trigger) {
  return {
    type: UPDATE_TIME_TRIGGER_JOB,
    trigger,
  };
}

export function deleteTimeTrigger(trigger) {
  return {
    type: DELETE_TIME_TRIGGER_JOB,
    trigger,
  };
}

export function updateAccount(account) {
  return {
    type: UPDATE_ACCOUNT,
    account,
  };
}

export function updateAPICredentials(credentials) {
  return {
    UPDATE_API_CREDENTIALS,
    credentials,
  };
}

export function addTarget(target) {
  return {
    type: ADD_TARGET,
    target,
  };
}

export function updateTarget(target) {
  return {
    type: UPDATE_TARGET,
    target,
  };
}

export function deleteTarget(target) {
  return {
    type: DELETE_TARGET,
    target,
  };
}

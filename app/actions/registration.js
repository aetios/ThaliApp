export const REGISTER = 'REGISTRATION_REGISTER';
export const UPDATE = 'REGISTRATION_UPDATE';
export const CANCEL = 'REGISTRATION_CANCEL';
export const FIELDS = 'REGISTRATION_FIELDS';
export const LOADING = 'REGISTRATION_FETCHING';
export const FAILURE = 'REGISTRATION_FAILURE';
export const SUCCESS = 'REGISTRATION_SUCCESS';
export const SHOW_FIELDS = 'REGISTRATION_SHOW_FIELDS';

export function register(event) {
  return { type: REGISTER, payload: { event } };
}

export function update(registration, fields) {
  return { type: UPDATE, payload: { registration, fields } };
}

export function cancel(registration) {
  return { type: CANCEL, payload: { registration } };
}

export function retrieveFields(registration) {
  return { type: FIELDS, payload: { registration } };
}

export function loading() {
  return { type: LOADING };
}

export function failure() {
  return { type: FAILURE };
}

export function success() {
  return { type: SUCCESS };
}

export function showFields(registration, fields) {
  return { type: SHOW_FIELDS, payload: { registration, fields } };
}

import * as types from './actionTypes';

export function login(username, password) {
  return {
    type: types.LOGIN,
    success: password === '42',
  };
}

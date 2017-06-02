import * as types from './actionTypes';
import { apiUrl } from '../url';

export function calendarRetrieved(eventList) {
  return {
    type: types.CALENDARRETREIVED,
    eventList,
  };
}

export function calendarNotRetrieved() {
  return {
    type: types.CALENDARERROR,
  };
}

export function retrieveCalendar(token) {
  return (dispatch) => {
    const data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    return fetch(`${apiUrl}/events/`, data)
      .then(
        response => response.json())
      .then(
        responseJson => dispatch(calendarRetrieved(responseJson)))
      .catch(() => dispatch(calendarNotRetrieved()));
  };
}

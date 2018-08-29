import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';
import { Sentry } from 'react-native-sentry';

import { apiRequest, tokenSelector } from '../utils/url';
import * as eventActions from '../actions/event';

const event = function* event(action) {
  const { pk } = action.payload;
  const token = yield select(tokenSelector);

  yield put(eventActions.fetching());

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const eventData = yield call(apiRequest, `events/${pk}`, data);

    const params = {
      status: 'registered',
    };

    const eventRegistrations = yield call(apiRequest, `events/${pk}/registrations`, data, params);

    yield put(eventActions.success(
      eventData,
      eventRegistrations,
    ));
  } catch (error) {
    Sentry.captureException(error);
    yield put(eventActions.failure());
  }
};

const eventSaga = function* eventSaga() {
  yield takeEvery(eventActions.EVENT, event);
};

export default eventSaga;

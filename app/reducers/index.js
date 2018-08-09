import { combineReducers } from 'redux';
import session from './session';
import navigation from './navigation';
import event from './event';
import calendar from './calendar';
import welcome from './welcome';
import profile from './profile';
import pizza from './pizza';
import registration from './registration';
import members from './members';
import settings from './settings';

export default combineReducers({
  session,
  navigation,
  event,
  calendar,
  welcome,
  profile,
  pizza,
  registration,
  members,
  settings,
});

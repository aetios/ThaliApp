import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, TouchableHighlight, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Moment from 'moment';

import * as actions from '../../../actions/event';
import { retrievePizzaInfo } from '../../../actions/pizza';

import styles from './style/EventDetailCard';
import Colors from '../../style/Colors';

const getInfo = (event, hasRegistrationIndicator) => {
  const start = Moment(event.start);
  const end = Moment(event.end);

  if (start.isSame(end, 'day')) {
    return (
      <Text style={[styles.eventInfo, hasRegistrationIndicator && styles.indicatorMargin]}>
        {`${start.format('HH:mm')} - ${end.format('HH:mm')} | ${event.location}`}
      </Text>
    );
  }
  return (
    <View>
      <Text style={[styles.eventInfo, hasRegistrationIndicator && styles.indicatorMargin]}>
        {`${start.format('D MMMM HH:mm')} - ${end.format('D MMMM HH:mm')}`}
      </Text>
      <Text style={styles.eventInfo}>
        {event.location}
      </Text>
    </View>
  );
};

const EventDetailCard = (props) => {
  const hasRegistrationIndicator = props.event.registered !== null;

  return (
    <TouchableHighlight
      onPress={() => props.loadEvent(props.event.pk)}
      style={styles.card}
      underlayColor={Colors.pressedWhite}
    >
      <View>
        <Text style={[styles.eventTitle, hasRegistrationIndicator && styles.indicatorMargin]}>
          {props.event.title}
        </Text>
        {getInfo(props.event, hasRegistrationIndicator)}
        <Text
          numberOfLines={2}
          style={styles.description}
        >
          {props.event.description}
        </Text>
        <View style={styles.buttonList}>
          <Text style={[styles.moreInfo, styles.button]}>
            {props.t('MORE INFO')}
          </Text>
          {props.event.pizza ? (
            <TouchableOpacity
              onPress={() => props.retrievePizzaInfo()}
              style={styles.button}
            >
              <Text style={styles.orderPizza}>
                {props.t('PIZZA')}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {hasRegistrationIndicator && (
          <View
            style={[
              styles.indicator,
              props.event.registered ? styles.registered : styles.unregistered]}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

EventDetailCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string,
    pk: PropTypes.number,
    registered: PropTypes.bool,
    pizza: PropTypes.bool,
  }).isRequired,
  loadEvent: PropTypes.func.isRequired,
  retrievePizzaInfo: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadEvent: pk => dispatch(actions.event(pk)),
  retrievePizzaInfo: () => dispatch(retrievePizzaInfo()),
});

export default connect(() => ({}), mapDispatchToProps)(translate(['screens/welcome/EventDetailCard'])(EventDetailCard));

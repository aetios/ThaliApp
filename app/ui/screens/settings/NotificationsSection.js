import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import styles from './style/NotificationsSection';
import Colors from '../../style/Colors';

import { notificationsSettingsActions } from '../../../actions/settings';
import CardSection from '../../components/cardSection/CardSection';

const GENERAL_KEY = 'general';

class NotificationsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps = (props) => {
    if (props.status !== 'success') {
      return null;
    }

    const newState = {};
    for (let i = 0; i < props.categoryList.length; i += 1) {
      if (props.categoryList[i].key === GENERAL_KEY) {
        newState[props.categoryList[i].key] = true;
      } else {
        newState[props.categoryList[i].key] = props.categoryList[i].enabled;
      }
    }
    return newState;
  };

  updateField = (key, value) => {
    const update = {};
    update[key] = value;
    this.setState(update, () => {
      const categories = Object.keys(this.state).filter(k => this.state[k]);
      this.props.saveCategories(categories);
    });
  };

  render() {
    const { status, categoryList, t } = this.props;
    let content = (
      <Text style={styles.emptyText}>
        {t('Notifications settings could not be loaded.')}
      </Text>
    );

    if (status === 'success') {
      content = categoryList.map((category, i) => (
        <View
          style={[styles.categoryContainer, i !== 0 && styles.borderTop]}
          key={category.key}
        >
          <Text
            style={styles.label}
          >
            {category.name}
            {' '}
            {category.key === GENERAL_KEY && this.props.t('(required)')}
          </Text>
          <Switch
            value={this.state[category.key]}
            onValueChange={value => this.updateField(category.key, value)}
            onTintColor={Colors.magenta}
            thumbTintColor={this.state[category.key]
              ? Colors.darkMagenta : Colors.gray}
            disabled={category.key === GENERAL_KEY}
          />
        </View>
      ));
    }

    return (
      <CardSection sectionHeader={t('Notifications')}>
        {content}
      </CardSection>
    );
  }
}

NotificationsSection.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  saveCategories: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categoryList: state.settings.pushNotifications.categoryList,
  status: state.settings.pushNotifications.status,
});

const mapDispatchToProps = dispatch => ({
  saveCategories: catList => dispatch(notificationsSettingsActions.saveCategories(catList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('screens/settings/PushNotifications')(NotificationsSection));

import React, { Component } from 'react';
import {
  View, Text, Switch, RefreshControl, ScrollView, FlatList, TouchableOpacity,
} from 'react-native';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';

import styles from './style/EventAdminScreen';
import Colors from '../../style/Colors';

import StandardHeader from '../../components/standardHeader/StandardHeader';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import SearchHeader from '../memberList/SearchHeaderContainer';

const PAYMENT_TYPES = {
  NONE: 'no_payment',
  CARD: 'card_payment',
  CASH: 'cash_payment',
};

const FILTER_TYPES = [
  'none', 'presence', 'payment',
];

class EventAdminScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registrations: {},
      searchKey: '',
      filterType: FILTER_TYPES[0],
    };

    for (let i = 0; i < this.props.registrations.length; i += 1) {
      const {
        pk, name, present, payment,
      } = this.props.registrations[i];

      this.state.registrations[pk] = {
        name, present, payment,
      };
    }
  }

  applyFilter = (keys) => {
    let result = keys.filter(this.containsSearchKey);
    if (this.state.filterType === 'payment') {
      result = result.filter(pk => this.state.registrations[pk].payment === PAYMENT_TYPES.NONE);
    } else if (this.state.filterType === 'presence') {
      result = result.filter(pk => !this.state.registrations[pk].present);
    }
    return result;
  };

  containsSearchKey = (pk) => {
    const name = this.state.registrations[pk].name.toLowerCase();
    return name.indexOf(this.state.searchKey.toLowerCase()) >= 0;
  };

  handleRefresh = () => {
    const { refresh, event } = this.props;
    refresh(event);
  };

  sortByName = (a, b) => {
    const nameA = this.state.registrations[a].name.toLowerCase();
    const nameB = this.state.registrations[b].name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  updateFilter = () => {
    const { filterType } = this.state;
    const newFilter = FILTER_TYPES[(FILTER_TYPES.indexOf(filterType) + 1) % FILTER_TYPES.length];

    if (newFilter === 'none') {
      Snackbar.show({ title: this.props.t('Disabled filter') });
    } else if (newFilter === 'presence') {
      Snackbar.show({ title: this.props.t('Filtering on presence') });
    } else if (newFilter === 'payment') {
      Snackbar.show({ title: this.props.t('Filtering on payment') });
    }
    this.setState({ filterType: newFilter });
  };

  updateValue = (pk, present, payment) => {
    const { registrations } = this.state;

    registrations[pk] = {
      name: registrations[pk].name,
      present,
      payment,
    };

    this.props.updateRegistration(pk, present, payment);
    this.setState({ registrations });
  };

  renderRegistration = ({ item, index }) => {
    const {
      name, present, payment,
    } = this.state.registrations[item];
    const { t } = this.props;

    return (
      <View key={item} style={[styles.registration, index !== 0 && styles.borderTop]}>
        <Text style={[styles.text, styles.name]}>
          {name}
        </Text>
        <View style={styles.registrationControls}>
          <View style={styles.presenceContainer}>
            <Text style={[styles.text, styles.label]}>
              {t('Present')}
            </Text>
            <Switch
              value={present}
              onValueChange={value => this.updateValue(item, value, payment)}
              onTintColor={Colors.magenta}
              thumbTintColor={present ? Colors.darkMagenta : Colors.gray}
            />
          </View>
          <View style={styles.paymentContainer}>
            <TouchableOpacity
              key={`${item}_${PAYMENT_TYPES.NONE}`}
              onPress={() => this.updateValue(item, present, PAYMENT_TYPES.NONE)}
              style={[styles.button, payment === PAYMENT_TYPES.NONE && styles.selected]}
              underlayColor={Colors.gray}
            >
              <Text style={[styles.text, styles.buttonText]}>
                {t('Not paid')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={`${item}_${PAYMENT_TYPES.CASH}`}
              onPress={() => this.updateValue(item, present, PAYMENT_TYPES.CASH)}
              style={[styles.button, payment === PAYMENT_TYPES.CASH && styles.selected]}
              underlayColor={Colors.gray}
            >
              <Text style={[styles.text, styles.buttonText]}>
                {t('Cash')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={`${item}_${PAYMENT_TYPES.CARD}`}
              onPress={() => this.updateValue(item, present, PAYMENT_TYPES.CARD)}
              style={[styles.button, payment === PAYMENT_TYPES.CARD && styles.selected]}
              underlayColor={Colors.gray}
            >
              <Text style={[styles.text, styles.buttonText]}>
                {t('Card')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { status, loading, t } = this.props;

    if (status === 'initial') {
      return (
        <View style={styles.rootWrapper}>
          <StandardHeader />
          <LoadingScreen />
        </View>
      );
    }
    if (status === 'success') {
      let keys = Object.keys(this.state.registrations);
      if (keys.length === 0) {
        return (
          <View style={styles.rootWrapper}>
            <StandardHeader />
            <ScrollView
              backgroundColor={Colors.background}
              contentContainerStyle={styles.rootWrapper}
              refreshControl={(
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this.handleRefresh}
                />
              )}
            >
              <ErrorScreen message={t('No registrations found...')} />
            </ScrollView>
          </View>
        );
      }

      keys = this.applyFilter(Object.keys(this.state.registrations));

      const header = (
        <SearchHeader
          title={t('Registrations')}
          searchText={t('Find a member')}
          search={searchKey => this.setState({ searchKey })}
          searchKey={this.state.searchKey}
          leftIcon="arrow-back"
          leftIconAction={this.props.goBack}
        />
      );

      const filterButton = (
        <TouchableOpacity
          onPress={this.updateFilter}
          style={styles.filterButton}
        >
          <Icon
            name="filter-list"
            size={32}
            color={Colors.white}
          />
        </TouchableOpacity>
      );

      if (keys.length === 0) {
        return (
          <View style={styles.rootWrapper}>
            {header}
            <ScrollView
              backgroundColor={Colors.background}
              contentContainerStyle={styles.rootWrapper}
              refreshControl={(
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this.handleRefresh}
                />
              )}
            >
              <Text
                style={[styles.text, styles.noResultsMessage]}
              >
                {t('No registrations found with this filter.')}
              </Text>
            </ScrollView>
            {filterButton}
          </View>
        );
      }

      keys.sort(this.sortByName);

      return (
        <View style={styles.rootWrapper}>
          {header}
          <FlatList
            backgroundColor={Colors.background}
            contentContainerStyle={styles.container}
            data={keys}
            renderItem={this.renderRegistration}
            refreshControl={(
              <RefreshControl
                refreshing={loading}
                onRefresh={this.handleRefresh}
              />
            )}
            keyExtractor={item => item}
          />
          {filterButton}
        </View>
      );
    }
    return (
      <View style={styles.rootWrapper}>
        <StandardHeader />
        <ScrollView
          backgroundColor={Colors.background}
          contentContainerStyle={styles.rootWrapper}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={this.handleRefresh}
            />
          )}
        >
          <ErrorScreen message={t('Could not load the event...')} />
        </ScrollView>
      </View>
    );
  }
}

EventAdminScreen.propTypes = {
  registrations: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    present: PropTypes.bool.isRequired,
    payment: PropTypes.string.isRequired,
  })).isRequired,
  event: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  updateRegistration: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('screens/events/EventAdminScreen')(EventAdminScreen);

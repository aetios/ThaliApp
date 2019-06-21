import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, View } from 'react-native';
import { STATUS_FAILURE, STATUS_INITIAL } from '../../../reducers/photos';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import AlbumListItem from './AlbumListItem';
import styles from './style/AlbumsOverviewScreen';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';

const windowWidth = Dimensions.get('window').width;
const numColumns = 2;
export const albumSize = (windowWidth - 48) / numColumns;

const AlbumsOverviewScreen = (props) => {
  const {
    t, fetching, status, openAlbum,
  } = props;
  if (fetching && status === STATUS_INITIAL) {
    return <LoadingScreen />;
  }
  if (!fetching && status === STATUS_FAILURE) {
    return (
      <View style={styles.wrapper}>
        <ErrorScreen style={styles.errorScreen} message={t('Sorry! We couldn\'t load any data.')} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.listContainer}
        data={props.albums}
        renderItem={
          ({ item }) => (
            <AlbumListItem
              album={item}
              size={albumSize}
              style={styles.listItem}
              onPress={openAlbum}
            />
          )
        }
        keyExtractor={item => item.pk}
        numColumns={numColumns}
      />
    </View>
  );
};


AlbumsOverviewScreen.propTypes = {
  fetching: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(AlbumListItem.propTypes.album).isRequired,
  openAlbum: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStandardHeader(AlbumsOverviewScreen, true);

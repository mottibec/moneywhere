import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import UserCard from '../components/UserCard';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}>

        </MapView>
        <View pointerEvents="none" style={styles.users}>
          {this.createUserCards()}
        </View>
      </View>
    );
  }
  createUserCards() {
    const { users } = this.state;
    return users.map(user => {
      return (
        <View key={user.id} style={styles.member}>
          <UserCard user={user}></UserCard>
        </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {

  }
});

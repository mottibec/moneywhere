import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Text
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import UserCard from '../components/UserCard';
import Geolocation from 'react-native-geolocation-service';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  initialRegion = {
    latitude: 37.600425,
    longitude: -122.385861,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  constructor() {
    super();
    this.state = {
      users: [
        { name: "motti", id: 1, rating: 5, avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" },
        { name: "nave", id: 1, rating: 2, avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" }
      ]
    };
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.initialRegion}>
        </MapView>
        <View pointerEvents="none" style={styles.members}>
          {this.createUserCards()}
        </View>
      </View>
    );
  }
  createUserCards() {
    let users = this.state.users;
    if (users === null) {
      return <View><Text>No Users Found</Text></View>;
    }
    return users.map(user => {
      return (
        <UserCard user={user}></UserCard>
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  users: {

  }
});

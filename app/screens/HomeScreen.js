import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import UserCarousel from '../components/UserCarousel';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#03a5fc"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  initialRegion = {
    latitude: 40.693451,
    longitude: -73.917007,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  constructor() {
    super();
    this.state = {
      users: [
        {
          name: "motti",
          id: 1,
          rating: 5,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.693451,
            longitude: -73.917007

          }
        },
        {
          name: "moshe",
          id: 2,
          rating: 4,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.695839,
            longitude: -73.921831
          }
        },
        {
          name: "david",
          id: 3,
          rating: 3,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.702899,
            longitude: -73.928379
          }
        },
        {
          name: "matt",
          id: 4,
          rating: 1,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.701891,
            longitude: -73.923305
          }
        },
        {
          name: "mojo",
          id: 5,
          rating: 2,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.705730,
            longitude: -73.930383
          }
        },
        {
          name: "nepton",
          id: 6,
          rating: 4,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.7063481,
            longitude: -73.920817
          }
        },
        {
          name: "dave",
          id: 7,
          rating: 3,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.707031,
            longitude: -73.915112
          }
        },
        {
          name: "jack",
          id: 8,
          rating: 2,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.708332,
            longitude: -73.933985
          }
        },
        {
          name: "mordechai",
          id: 9,
          rating: 5,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.709341,
            longitude: -73.920687
          }
        },
        {
          name: "sima",
          id: 10,
          rating: 5,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.706543,
            longitude: -73.921288
          }
        },
        {
          name: "sonya",
          id: 11,
          rating: 3,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.693451,
            longitude: -73.914682
          }
        },
        {
          name: "boris",
          id: 12,
          rating: 5,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.707128,
            longitude: -73.921073
          }
        },
        {
          name: "nave",
          id: 13,
          rating: 2,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          location: {
            latitude: 40.711976,
            longitude: -73.912880
          }
        }
      ]
    };
  }

  render() {
    const { users } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={map => this._map = map}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.initialRegion}
          customMapStyle={mapStyle}>
          {this.createUserMarkers(users)}
        </MapView>
        <View style={styles.users}>
          {this.createUserCards(users)}
        </View>
      </View>
    );
  };
  centerMapOnUser(userIndex) {
    const { users } = this.state;
    let user = users[userIndex];
    const mapRef = this._map;

    mapRef.animateToRegion({
      latitude: user.location.latitude,
      longitude: user.location.longitude,
      latitudeDelta: 0.0315,
      longitudeDelta: 0.0258
    });
  };
  createUserMarkers(users) {
    return (
      users.map(user => (
        <Marker
          key={user.id}
          coordinate={user.location}
          title={user.name}
        />
      ))
    )
  };
  createUserCards(users) {
    if (users === null) {
      return (
        <View>
          <Text>No Users Found</Text>
        </View>
      );
    }
    return (
      <UserCarousel
        users={users}
        onClickAction={(user) => alert(`Ping ${user.name}`)}
        onSnapToItem={(user) => this.centerMapOnUser(user)}
      >
      </UserCarousel>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  },
  users: {
    position: "absolute",
    bottom: 25
  }
});

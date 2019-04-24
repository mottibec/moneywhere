import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Platform, Dimensions } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { DrawerActions } from 'react-navigation-drawer';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import * as actions from '../Actions';
import { getDistance } from 'geolib';
import mapStyle from '../../assets/MapStyle/GreyBlue.json';
import SearchBar from '../Components/SearchBar';
import FilterModal from '../Components/FilterModal';
import TinderCards from '../Components/TinderCards';

const ANDROID = Platform.OS === 'android';
const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeScreen extends React.Component {

    async componentDidMount() {
        this.props.getData();
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status === 'granted') {
            this.getLocation();
        }
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.userData.length === 0 && this.props.userData.length > 0) {
            await this.props.userData.map(async item => await Image.prefetch(item.avatar));
            this.setState({ imagesFetched: true });
        }
    }

    static navigationOptions = {
        header: null
    };

    state = {
        region: {
            longitude: -122.0840052,
            latitude: 37.4220181,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        },
        mapFilterVisible: false,
        markerInFocus: 0,
        imagesFetched: false
    };

    _map = {};

    getLocation = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if(enabled) {
            let { coords } = await Location.getCurrentPositionAsync({});
            this._map.animateToRegion({ 
                longitude: coords.longitude,
                latitude: coords.latitude,
                longitudeDelta: 0.04,
                latitudeDelta: 0.09
            });
            this.props.setMyLocation({
                longitude: coords.longitude,
                latitude: coords.latitude
            });
        } else {
            Alert.alert(
                'Location Services Disabled',
                'MoneyWhere needs to access your location. Please turn on GPS service.',
                [
                    { text: 'Ok', style: 'cancel' }
                ]
            );
        }
    };

    locationHandler = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status === 'granted') {
            this.getLocation();
        } else {
            Alert.alert(
                'Access Denied',
                'Allow MoneyWhere to access your location',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Try again', onPress: () => this.tryAgain() }
                ]
            );
        }
    };

    tryAgain() {
        if(ANDROID) {
            this.locationHandler();
        } else {
            Linking.openURL('app-settings://location/MoneyWhere');
        }
    };

    //fired when apply button in the filter modal is pressed
    onApplyFilter = () => {
        this.setState({ mapFilterVisible: false });
    };

    onCardSwipe = currentIndex => {
        let newRegion = {
            longitude: this.props.userData[currentIndex].location.longitude,
            latitude: this.props.userData[currentIndex].location.latitude,
            longitudeDelta: 0.0165,
            latitudeDelta: 0.0123
        };
        this.setState({ markerInFocus: currentIndex });
        this._map.animateToRegion(newRegion, 800);
    };

    distanceCalc(location) {
        return getDistance(this.props.myLocation, location, 100)/1000;
    }

    renderRating(ratingVal) {
        let ratings = [1, 2, 3, 4, 5];
        let deleteCount = 5 - ratingVal;
        let deleted = ratings.splice(ratings.indexOf(ratingVal)+1, deleteCount);
        let icons = ratings.map((item, i) => 
            <Icon name="md-star" type="ionicon" size={16} color="white" key={i+10} 
            containerStyle={{marginLeft: 3}}/>
        );
        return icons.concat(deleted.map((item, i) => <Icon name="md-star" type="ionicon" size={16} color="#5da5f5" key={i+20} containerStyle={{marginRight: 3}}/>));
    }

    renderItem = ({item}) => {
        let distance = this.distanceCalc(item.location);
        return (
            <View style={styles.cardWrapper} key={item.id}>
                <View style={{ flex: 1, flexDirection: 'row', margin: 13, marginBottom: 0 }}>
                    <View style={styles.leftWrapper}>
                        <Text style={styles.nameStyle} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.subTextStyle} numberOfLines={3}>Please pick your citizenship to allow Lorem to display the courses in your local currency.</Text>
                        <View style={{marginTop: 15, flexDirection: 'row'}}>
                            {this.renderRating(item.rating)}
                        </View>
                        <View style={styles.distanceWrapper}>
                            <Icon name="location-pin" type="simple-line-icon" size={18} color="white"/>
                            <View><Text style={styles.distanceText}>{`${distance}KM`}</Text></View>
                        </View>
                        <Text style={styles.viewProfileText}>View Full Profile</Text>
                    </View>
                    <View style={{ flex: 1 }}/>
                    <View style={styles.rightWrapper}>
                        <Image source={{ uri: item.avatar }} style={styles.thumbnailStyle} />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.rightText} numberOfLines={1}>Budget</Text>
                            <Text style={styles.budgetText} numberOfLines={1}>527$</Text>
                            <Text style={[styles.rightText, {width: 80}]} 
                            numberOfLines={1}>Commission - 3%</Text>
                        </View>
                    </View>
                </View>
                <Button title="PING" containerStyle={styles.pingButtonContainer} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonText} icon={styles.buttonIcon} 
                onPress={() => this.props.togglePingCards(true)} />
            </View>
        );
    };

    renderMarkers() {
        let { userData, myLocation } = this.props;
        let markers = userData.map((item, index) =>
            this.state.markerInFocus === index ? (
                <MapView.Marker coordinate={item.location} tracksViewChanges={false} zIndex={5} 
                key={item.id}>
                    <View style={{height: 70}}>
                        <Icon name="location-pin" type="entypo" size={70} color="#177EF1" />
                        <Image source={{uri: item.avatar}} style={styles.focusedMarkerImage}/>
                    </View>
                </MapView.Marker>
            ) : (
                <MapView.Marker coordinate={item.location} tracksViewChanges={false} zIndex={1} 
                key={item.id}>
                    <View style={{height: 45}}>
                        <Icon name="location-pin" type="entypo" size={45} color="#177EF1" />
                        <Image source={{uri: item.avatar}} style={styles.markerImage}/>
                    </View>
                </MapView.Marker>
            )
        );
        if(myLocation.latitude === 0 || myLocation.latitude === 0) {
            return markers;
        } else {
            return markers.concat(
            <MapView.Marker coordinate={this.props.myLocation} tracksViewChanges={false} key={9999}>
                <Icon name="location-on" type="material" size={50} color="black" />
            </MapView.Marker>
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView style={{ flex: 1 }} initialRegion={this.state.region} 
                ref={component => this._map = component} provider={MapView.PROVIDER_GOOGLE}
                onRegionChangeComplete={region => this.setState({ region })} customMapStyle={mapStyle}>
                    {this.state.imagesFetched ? this.renderMarkers() : null}
                </MapView>
                <TouchableOpacity style={styles.menuTouchableOpacity} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <View style={styles.menuButtonWrapper}>
                        <Icon name="menu" type="feather" color="white" size={22}/>
                    </View>
                </TouchableOpacity>
                <SearchBar onRightIconPress={() => this.setState({ mapFilterVisible: true })}/>
                <FilterModal visible={this.state.mapFilterVisible} 
                onPressCancel={() => this.setState({ mapFilterVisible: false })} 
                onPressButton={this.onApplyFilter}/>
                <TouchableOpacity onPress={this.locationHandler} style={styles.touchableOpacity}>
                    <View style={styles.locationButtonWrapper}>
                        <Icon name="my-location" type="material" color="#177EF1" size={22}/>
                    </View>
                </TouchableOpacity>
                { !this.props.isPingVisible ?
                <View style={styles.carouselWrapper}>
                    <Carousel data={this.props.userData} renderItem={this.renderItem} itemWidth={SCREEN_WIDTH-60} sliderWidth={SCREEN_WIDTH} swipeThreshold={10} 
                    onBeforeSnapToItem={index => this.onCardSwipe(index)} inactiveSlideOpacity={1} />
                </View> :
                <TinderCards isVisible={this.props.isPingVisible} data={this.props.userData} 
                navigation={this.props.navigation}/> }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.userData.data,
        myLocation: state.myLocation,
        isPingVisible: state.userMode.pingCardsVisible
    };
};

export default connect(mapStateToProps, actions)(HomeScreen);

const styles = {
    menuButtonWrapper: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    menuTouchableOpacity: {
        position: 'absolute',
        top: 30,
        left: 15
    },
    touchableOpacity: {
        position: 'absolute',
        bottom: 230,
        right: 10
    },
    locationButtonWrapper: {
        height: 46,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
        backgroundColor: 'white',
        elevation: 5,
        shadowOffset: { width: 5, height: 2 },
        shadowColor: '#177EF1',
        shadowOpacity: 0.7
    },
    cardWrapper: {
        backgroundColor: '#177EF1',
        height: 200,
        flexDirection: 'column',
        elevation: 5,
        shadowColor: '#177EF1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    leftWrapper: {
        flex: 2,
        flexDirection: 'column'
    },
    rightWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    nameStyle: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'AmazonEmber',
        marginBottom: 2
    },
    subTextStyle: {
        fontSize: 8,
        color: 'white',
        width: SCREEN_WIDTH/2,
        fontFamily: 'AmazonEmber'
    },
    thumbnailStyle: {
        height: 60,
        width: 60,
        borderRadius: 3,
        marginBottom: 5
    },
    markerImage: {
        height: 16,
        width: 16,
        borderRadius: 8,
        position: 'absolute',
        top: 8,
        left: 15
    },
    focusedMarkerImage: {
        height: 24,
        width: 24,
        borderRadius: 12,
        position: 'absolute',
        top: 13,
        left: 23
    },
    carouselWrapper: {
        flex: 1,
        position: 'absolute',
        bottom: 20
    },
    rightText: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'AmazonEmber'
    },
    budgetText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'MontserratSemiBold',
        marginBottom: 4
    },
    pingButtonContainer: {
        marginTop: 133,
        // marginLeft: -15,
        // marginRight: -15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        height: 50,
        width: SCREEN_WIDTH-60,
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: 'white'
    },
    buttonText: {
        fontFamily: 'MontserratExtraBold',
        fontSize: 18,
        color: 'black'
    },
    buttonIcon: {
        name: 'phonelink-ring',
        type: 'material',
        color: 'black',
        size: 20
    },
    distanceText: {
        fontSize: 12,
        fontFamily: 'AmazonEmber',
        color: 'white',
        marginLeft: 10,
        marginTop: -7
    },
    viewProfileText: {
        fontSize: 16,
        fontFamily: 'AmazonEmber',
        color: 'white',
        marginTop: 20,
        textDecorationLine: 'underline'
    },
    distanceWrapper: {
        flexDirection: 'row',
        marginTop: 25
    }
};
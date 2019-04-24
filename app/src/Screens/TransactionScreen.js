import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Platform, Dimensions, Alert } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { Icon, ButtonGroup, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDistance } from 'geolib';
import * as actions from '../Actions';
import mapStyle from '../../assets/MapStyle/GreyBlue.json'

const ANDROID = Platform.OS === 'android';
const SCREEN_WIDTH = Dimensions.get('window').width;

const paymentButtons = [
    { element: () => <Image source={require('../../assets/google_pay.png')} style={styles.googlePay}/> },
    { element: () => <Image source={require('../../assets/paybox.jpg')} style={styles.paybox}/> },
    { element: () => <Image source={require('../../assets/bit.png')} style={styles.bit}/> },
    { element: () => <Image source={require('../../assets/pepper_pay.png')} style={styles.pepperPay}/> }
];

class ApprovalScreen extends React.Component {

    componentDidMount() {
        if(!ANDROID) {
            this.setState({ selectedPaymentMethod: 1 });
        }
    }

    state = {
        region: {
            longitude: -73.917007,//this.props.navigation.state.params.item.location.longitude,
            latitude: 40.693451,//this.props.navigation.state.params.item.location.latitude,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        },
        selectedPaymentMethod: 0,
        amount: ''
    };

    _map = {};

    static navigationOptions = {
        header: null
    };

    getLocation = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if(enabled) {
            let { coords } = await Location.getCurrentPositionAsync({});
            this._map.animateToRegion({ 
                longitude: coords.longitude,
                latitude: coords.latitude,
                longitudeDelta: 0.0165,
                latitudeDelta: 0.0123
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

    distanceCalc(location) {
        return getDistance(this.props.myLocation, location, 100)/1000;
    }

    renderRating(ratingVal) {
        let ratings = [1, 2, 3, 4, 5];
        let deleteCount = 5 - ratingVal;
        let deleted = ratings.splice(ratings.indexOf(ratingVal)+1, deleteCount);
        let icons = ratings.map((item, i) => 
            <Icon name="md-star" type="ionicon" size={16} color="#177EF1" key={i+10} 
            containerStyle={{marginLeft: 3}}/>
        );
        return icons.concat(deleted.map((item, i) => <Icon name="md-star" type="ionicon" size={16} color="rgba(0, 0 ,0 , 0.2)" key={i+20} containerStyle={{marginLeft: 3}}/>));
    }

    onWhatsappButtonPress = () => {
        let url = `whatsapp://send?phone=+923096855375`;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(
                    'WhatsApp not installed',
                    'Please install WhatsApp to contact this user',
                    [
                        { text: 'Ok', style: 'cancel' }
                    ]
                )
            }
        });
    };

    appDeepLink = async (url, id) => {
        let canOpen = await Linking.canOpenURL(url);
        if(canOpen) {
            Linking.openURL(url);
        } else {
            Linking.openURL(`market://details?id=${id}`);
        }
    };

    onPaymentPress = () => {
        switch(this.state.selectedPaymentMethod) {
            case 0:
                return this.appDeepLink('google pay', 'com.google.android.apps.walletnfcrel');
            case 1:
                return this.appDeepLink('pbox://', 'com.payboxapp');
            case 2:
                return this.appDeepLink('bit', 'com.bnhp.payments.paymentsapp');
            case 3:
                return this.appDeepLink('app://com.pepper.pay', 'com.pepper.pay');
            default:
                return null;
        }
    };
    
    renderCard(item) {
        let distance = this.distanceCalc(item.location);
        return (
            <View style={styles.cardWrapper}>
                <View style={{ flex: 5, flexDirection: 'row' }}>
                    <View style={styles.leftWrapper}>
                        <Text style={styles.nameStyle} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.subTextStyle} numberOfLines={3}>Please pick your citizenship to allow Lorem to display the courses in your local currency.</Text>
                            <View style={styles.ratingWrapper}>
                                {this.renderRating(item.rating)}
                            </View>
                            <View style={styles.distanceWrapper}>
                                <Icon name="location-pin" type="simple-line-icon" size={18} color="#177EF1"/>
                                <View><Text style={styles.distanceText}>{`${distance}KM`}</Text></View>
                            </View>
                        <Text style={styles.viewProfileText}>View Full Profile</Text>
                    </View>
                    <View style={styles.rightWrapper}>
                        <TouchableOpacity style={styles.contactImageTouchable}
                        onPress={() => Linking.openURL('tel:+923096855375')}>
                            <Image source={require('../../assets/call_button.png')} 
                            style={styles.contactImageStyle}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.expandedTouchable} onPress={this.onWhatsappButtonPress}>
                            <Image source={require('../../assets/whatsapp.png')} 
                            style={styles.expandedIcons}/>
                        </TouchableOpacity>
                        <View style={styles.rightTextWrapper}>
                            <Text style={styles.rightText} numberOfLines={1}>Budget</Text>
                            <Text style={styles.budgetText} numberOfLines={1}>527$</Text>
                            <Text style={[styles.rightText, {width: 80}]} 
                            numberOfLines={1}>Commission - 3%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.paymentWrapper}>
                    <ButtonGroup buttons={paymentButtons} selectedButtonStyle={styles.selectedButton}
                    selectedIndex={this.state.selectedPaymentMethod}
                    onPress={index => this.setState({ selectedPaymentMethod: index })}/>
                    <View style={styles.payNowWrapper}>
                        <Input inputContainerStyle={{ borderBottomWidth: 0 }} leftIcon={styles.leftIcon}
                        inputStyle={styles.inputStyle} placeholder="Amount" placeholderTextColor="#707070" value={this.state.amount}
                        onChangeText={text => this.setState({ amount: text })}
                        containerStyle={styles.inputContainer}/>
                        <TouchableOpacity onPress={this.onPaymentPress}>
                            <Image source={require('../../assets/pay_now.png')} style={styles.payNow}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        // let { item } = this.props.navigation.state.params;
        let item = {"name":"motti","id":"1","rating":4,"avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg","location":{"latitude":40.693451,"longitude":-73.917007}};
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }} initialRegion={this.state.region} 
                ref={component => this._map = component} provider={MapView.PROVIDER_GOOGLE}
                onRegionChangeComplete={region => this.setState({ region })} customMapStyle={mapStyle}>
                    <MapView.Marker coordinate={item.location} tracksViewChanges={false} 
                    key={0}>
                        <View style={{height: 45}}>
                            <Icon name="location-pin" type="entypo" size={45} color="#177EF1" />
                            <Image source={{uri: item.avatar}} style={styles.markerImage}/>
                        </View>
                    </MapView.Marker>
                    <MapView.Marker coordinate={this.props.myLocation} tracksViewChanges={false} zIndex={1} 
                    key={1}>
                        <View style={{height: 45}}>
                            <Icon name="location-pin" type="entypo" size={45} color="#177EF1" />
                            <Image source={{uri: item.avatar}} style={styles.markerImage}/>
                        </View>
                    </MapView.Marker>
                    {/* <MapView.Polyline coordinates={[this.props.myLocation, this.item.location]}/> */}
                </MapView>
                <TouchableOpacity style={styles.menuTouchableOpacity} 
                onPress={() => this.props.navigation.pop()}>
                    <View style={styles.menuButtonWrapper}>
                        <Icon name="arrow-back" type="material" color="white" size={25}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.locationHandler} style={styles.touchableOpacity}>
                    <View style={styles.locationButtonWrapper}>
                        <Icon name="my-location" type="material" color="#177EF1" size={22}/>
                    </View>
                </TouchableOpacity>
                {this.renderCard(item)}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        myLocation: state.myLocation
    };
}

export default connect(mapStateToProps, actions)(ApprovalScreen);

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
        bottom: 300,
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
        height: 270,
        width: SCREEN_WIDTH-40,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 20,
        right: 20,
        left: 20
    },
    paymentWrapper: {
        flex: 4,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'space-around'
    },
    payNowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    inputContainer: {
        height: 30,
        width: SCREEN_WIDTH/3,
        borderWidth: 1,
        borderColor: '#177EF1',
        justifyContent: 'center',
    },
    inputStyle: {
        fontFamily: 'AmazonEmber',
        fontSize: 12,
        color: 'black'
    },
    leftIcon: {
        name: 'usd',
        type: 'font-awesome',
        size: 12,
        color: 'black',
        marginLeft: -10
    },
    leftWrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    rightWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    nameStyle: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'AmazonEmber',
        marginLeft: 12,
        marginTop: 12
    },
    subTextStyle: {
        fontSize: 8,
        color: 'black',
        width: SCREEN_WIDTH/2,
        fontFamily: 'AmazonEmber',
        marginLeft: 12,
        marginTop: 3
    },
    distanceText: {
        fontSize: 12,
        fontFamily: 'AmazonEmber',
        color: 'black',
        marginLeft: 10
    },
    viewProfileText: {
        fontSize: 16,
        fontFamily: 'AmazonEmber',
        color: 'black',
        marginBottom: 15,
        marginLeft: 12,
        textDecorationLine: 'underline'
    },
    distanceWrapper: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
        marginLeft: 12
    },
    rightText: {
        fontSize: 10,
        color: 'black',
        fontFamily: 'AmazonEmber'
    },
    budgetText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'MontserratSemiBold',
        marginBottom: 3
    },
    contactImageStyle: {
        height: 70,
        width: 60
    },
    contactImageTouchable: {
        position: 'absolute',
        right: 0,
        top: 5
    },
    expandedIcons: {
        height: 45,
        width: 45
    },
    expandedTouchable: {
        position: 'absolute',
        top: 17,
        right: 70
    },
    ratingWrapper: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 12
    },
    rightTextWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginRight: 20
    },
    markerImage: {
        height: 16,
        width: 16,
        borderRadius: 8,
        position: 'absolute',
        top: 8,
        left: 15
    },
    googlePay: {
        height: 20,
        width: 50
    },
    paybox: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    bit: {
        height: 30,
        width: 30
    },
    pepperPay: {
        height: 32,
        width: 32
    },
    selectedButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#177EF1'
    },
    payNow: {
        height: 40,
        width: 85
    }
};
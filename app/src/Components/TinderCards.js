import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDistance } from 'geolib';
import Modal from "react-native-modal";
import SwipeDeck from './SwipeDeck';
import * as actions from '../Actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_HEIGHT = SCREEN_HEIGHT/1.6;
const TOP_MARGIN = (SCREEN_HEIGHT-(SCREEN_HEIGHT/1.5))/2;
const LEFT_MARGIN = (SCREEN_WIDTH/6.5)-35;
const RIGHT_MARGIN = SCREEN_WIDTH/6.5;
const IMAGE_SIZE = CARD_HEIGHT/3.5;

class TinderCards extends React.Component {

    renderRating(ratingVal) {
        let ratings = [1, 2, 3, 4, 5];
        let deleteCount = 5 - ratingVal;
        let deleted = ratings.splice(ratings.indexOf(ratingVal)+1, deleteCount);
        let icons = ratings.map((item, i) => 
            <Icon name="md-star" type="ionicon" size={12} color="#FFBB00" key={i+10} 
            containerStyle={{marginLeft: 3}}/>
        );
        return icons.concat(deleted.map((item, i) => <Icon name="md-star" type="ionicon" size={12} color="rgba(23,126,241, 0.4)" key={i+20} containerStyle={{marginLeft: 3}}/>));
    }

    onRequestAccept = item => {
        this.props.togglePingCards(false);
        this.props.navigation.navigate('approved', {item});
    };

    distanceCalc(location) {
        return getDistance(this.props.myLocation, location, 100)/1000;
    }

    renderItem = item => {
        let distance = this.distanceCalc(item.location);
        return (
            <View style={styles.itemWrapper}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', margin: 8 }}>
                    <View style={styles.imageOuterWrapper}>
                        <View style={styles.imageInnerWrapper}>
                            <Image source={{ uri: item.avatar }} style={styles.imageStyle}/>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text style={styles.nameText} numberOfLines={1}>{item.name.toUpperCase()}</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        {this.renderRating(item.rating)}
                    </View>
                    <View style={styles.distanceWrapper}>
                        <Icon name="location-pin" type="simple-line-icon" size={15} color="#177EF1"/>
                        <View><Text style={styles.distanceText}>{`${distance}KM`}</Text></View>
                    </View>
                    <Text style={styles.subText}>Hey, Its great to see you here. I need some cash. Can you help me with this issue?</Text>
                </View>
                <View style={styles.outerButtonsWrapper}>
                    <TouchableOpacity onPress={() => this.props.togglePingCards(false)}>
                        <View style={[styles.buttonWrapper, {borderColor: 'rgba(253, 121, 168, 0.5)'}]}>
                            <Icon name="x" type="feather" color="#FD79A8" size={15}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={[styles.buttonWrapper, {borderColor: '#BCE0FD'}]}>
                            <Icon name="user-o" type="font-awesome" color="#177EF1" size={15}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onRequestAccept(item)}>
                        <View style={[styles.buttonWrapper, {borderColor: '#BCE0FD'}]}>
                            <Icon name="check" type="feather" color="#177EF1" size={15}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {
        return (
            <Modal isVisible={this.props.isVisible} style={styles.modalStyle} backdropColor="#D4E6FB">
                <SwipeDeck data={this.props.userData} renderCard={this.renderItem}
                renderNoMoreCards={() => null} onSwipeRight={item => this.onRequestAccept(item)}/>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.userData.data,
        myLocation: state.myLocation
    };
}

export default connect(mapStateToProps, actions)(TinderCards);

const styles = {
    modalStyle: {
        justifyContent: 'center',
        flex: 1
    },
    itemWrapper: {
        height: CARD_HEIGHT,
        marginTop: TOP_MARGIN,
        marginLeft: LEFT_MARGIN,
        marginRight: RIGHT_MARGIN,
        backgroundColor: '#F1F9FF',
        justifyContent: 'center',
        borderRadius: 6,
        elevation: 3,
        shadowColor: '#177EF1',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    imageStyle: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE
    },
    imageOuterWrapper: {
        height: IMAGE_SIZE+90,
        width: IMAGE_SIZE+90,
        borderRadius: IMAGE_SIZE+90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(23,126,241, 0.1)'
    },
    imageInnerWrapper: {
        height: IMAGE_SIZE+65,
        width: IMAGE_SIZE+65,
        borderRadius: IMAGE_SIZE+65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(23,126,241, 0.1)'
    },
    buttonWrapper: {
        height: IMAGE_SIZE/2.1,
        width: IMAGE_SIZE/2.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: IMAGE_SIZE/2,
        backgroundColor: 'transparent',
        borderWidth: 2
    },
    outerButtonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 6,
        marginBottom: 2,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    nameText: {
        fontSize: 14,
        fontFamily: 'MontserratSemiBold',
        color: '#177EF1',
        marginBottom: 12
    },
    subText: {
        fontSize: 10,
        fontFamily: 'Montserrat',
        color: 'black',
        textAlign: 'center',
        width: SCREEN_WIDTH/2
    },
    distanceWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    distanceText: {
        fontFamily: 'Montserrat',
        fontSize: 12,
        color: 'black',
        paddingLeft: 10,
        paddingRight: -10
    }
};
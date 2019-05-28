import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Rating, Slider, Icon, Button } from 'react-native-elements';
import Modal from "react-native-modal";

const SCREEN_WIDTH = Dimensions.get('window').width;

class FilterModal extends React.Component {

    state = { rating: 1, distance: 0, commission: 0, amount: 0 };

    render() {
        return (
            <Modal isVisible={this.props.visible} onBackButtonPress={this.props.onPressCancel} onBackdropPress={this.props.onPressCancel} style={styles.modalStyle} backdropColor="#D4E6FB">
                <View style={styles.modalInnerWrapper}>
                    <Icon name="cross" type="entypo" size={20} color="#177EF1" 
                    onPress={this.props.onPressCancel} containerStyle={styles.crossIcon}/>
                    <View style={styles.ratingWrapper}>
                        <Text style={styles.itemLabel}>Rating</Text>
                        <Rating imageSize={24} startingValue={1} style={{ marginLeft: 25 }}
                        onFinishRating={val => this.setState({rating: val})}/>
                    </View>
                    <View style={styles.itemWrapper}>
                        <View style={styles.labelWrapper}>
                            <Text style={styles.itemLabel}>Distance</Text>
                            <Text style={styles.filterValue}>
                                {Math.round(this.state.distance * 100) / 100 + ' km'}
                            </Text>
                        </View>
                        <Slider minimumTrackTintColor="#177EF1" thumbStyle={styles.thumbStyle} 
                        value={this.state.distance} style={styles.sliderStyle}
                        onValueChange={val => this.setState({distance: val})} maximumValue={2} minimumValue={0} step={0.1}/>
                    </View>
                    <View style={styles.itemWrapper}>
                        <View style={styles.labelWrapper}>
                            <Text style={styles.itemLabel}>Commission</Text>
                            <Text style={styles.filterValue}>{this.state.commission+'%'}</Text>
                        </View>
                        <Slider minimumTrackTintColor="#177EF1" thumbStyle={styles.thumbStyle} 
                        value={this.state.commission} style={styles.sliderStyle}
                        onValueChange={val => this.setState({commission: val})} maximumValue={10} minimumValue={0} step={1}/>
                    </View>
                    <View style={styles.itemWrapper}>
                        <View style={styles.labelWrapper}>
                            <Text style={styles.itemLabel}>Amount</Text>
                            <Text style={styles.filterValue}>{'$'+this.state.amount}</Text>
                        </View>
                        <Slider minimumTrackTintColor="#177EF1" thumbStyle={styles.thumbStyle} 
                        value={this.state.amount} style={styles.sliderStyle}
                        onValueChange={val => this.setState({amount: val})} maximumValue={1000} minimumValue={0} step={1}/>
                    </View>
                    <Button title="APPLY" titleStyle={styles.buttonTitle} type="outline"
                    buttonStyle={styles.buttonStyle} containerStyle={styles.buttonContainer} 
                    onPress={this.props.onPressButton}/>
                </View>
            </Modal>
        );
    }
}

export default FilterModal;

const styles = {
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalInnerWrapper: {
        width: SCREEN_WIDTH-80,
        height: 380,
        backgroundColor: 'white',
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
    itemWrapper: {
        marginBottom: 15
    },
    sliderStyle: {
        width: SCREEN_WIDTH-130,
        marginLeft: 25
    },
    thumbStyle: {
        height: 15,
        width: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#177EF1'
    },
    labelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    itemLabel: {
        fontSize: 15,
        fontFamily: 'MontserratSemiBold',
        color: '#177EF1',
        marginLeft: 25
    },
    filterValue: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        color: '#529BF1',
        marginRight: 25
    },
    ratingWrapper: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 25,
        alignItems: 'center'
    },
    crossIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    buttonTitle: {
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#177EF1'
    },
    buttonStyle: {
        width: 100,
        borderWidth: 0
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 10,
        marginRight: 10
    }
};
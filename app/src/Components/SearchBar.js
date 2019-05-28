import React from 'react';
import { View } from 'react-native';
import { Input, Icon } from 'react-native-elements';

class SearchBar extends React.Component {

    render() {
        return (
            <View style={styles.inputWrapper}>
                <Input placeholder="Search" containerStyle={styles.inputContainerStyle} 
                inputContainerStyle={{ borderBottomWidth: 0 }} inputStyle={styles.inputStyle} placeholderTextColor="#707070" leftIcon={styles.leftIcon} 
                rightIcon={<Icon name="md-options" type="ionicon" color="#177EF1" size={20} 
                onPress={this.props.onRightIconPress}/>} leftIconContainerStyle={{marginLeft: 5}} rightIconContainerStyle={{marginRight: 7}}/>
            </View>
        );
    }
}

export default SearchBar;

const styles = {
    inputWrapper: {
        position: 'absolute',
        top: 90,
        right: 18,
        left: 18
    },
    inputContainerStyle: {
        height: 40,
        elevation: 1,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        fontSize: 14,
        fontFamily: 'MontserratLight',
        paddingLeft: 20,
        paddingTop: 1
    },
    leftIcon: {
        name: 'ios-search',
        type: 'ionicon',
        color: '#177EF1',
        size: 22
    }
};
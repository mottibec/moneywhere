import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const DrawerListItem = props => {

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.mainWrapper}>
                <Icon name={props.iconName} type={props.iconType} color="white" size={props.iconSize} 
                containerStyle={styles.iconContainer}/>
                <Text style={styles.labelStyle}>{props.itemLabel.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default DrawerListItem;

const styles = {
    mainWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40,
        marginBottom: SCREEN_HEIGHT/20
    },
    labelStyle: {
        color: 'white',
        fontSize: 12
    },
    iconContainer: {
        marginRight: 20
    }
};
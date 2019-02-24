import React from 'react';
import { View, Text } from 'react-native';

export default class UserCard extends React.Component {
    render(){
        return 
        <View>
            <Text>{this.props.user.name}</Text>
            <Text>{this.props.user.rating}</Text>
        </View>
    }
}
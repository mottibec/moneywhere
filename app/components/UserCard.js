import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class UserCard extends React.Component {
    render() {
        return (
            <Card>
                <View>
                    <Image
                        resizeMode="cover"
                        source={{ uri: this.props.user.avatar }}
                    />
                    <Text style={styles.name}>{this.props.user.name}</Text>
                    <Text>{this.props.user.rating}</Text>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    name: {

    }
});

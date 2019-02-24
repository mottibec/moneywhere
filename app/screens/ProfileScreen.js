import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class ProfileScreen extends React.Component {
    render() {
        return
        <View>
            <ScrollView>
                <Image source={this.userProfile} style={styles.profilePicure}></Image>
                <Text>{this.rating}</Text>
            </ScrollView>
        </View>
    }
}
const styles = StyleSheet.create({
    profilePicure: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    }
});
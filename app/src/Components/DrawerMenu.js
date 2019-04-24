import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import DrawerListItem from './DrawerListItem';
import StatusItem from './StatusItem';
import GroupedButtons from './GroupedButtons';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class DrawerMenu extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground 
                source={require('../../assets/DrawerBG.png')} style={styles.backgroundStyle}>
                    <View style={{ flex: 4, justifyContent: 'center', marginTop: SCREEN_HEIGHT/10 }}>
                        <DrawerListItem 
                        iconName="home" iconType="simple-line-icon" itemLabel="Home" iconSize={18} 
                        onPress={() => {}}/>
                        <DrawerListItem 
                        iconName="user" iconType="feather" itemLabel="Profile" iconSize={18} 
                        onPress={() => {}}/>
                        <DrawerListItem 
                        iconName="credit-card" iconType="font-awesome" itemLabel="Payment" iconSize={17} onPress={() => {}}/>
                        <DrawerListItem 
                        iconName="graph-bar" iconType="foundation" itemLabel="Daily Ranks" iconSize={22} onPress={() => {}}/>
                        <StatusItem/>
                        <DrawerListItem 
                        iconName="settings" iconType="feather" itemLabel="Settings" 
                        iconSize={18} onPress={() => {}}/>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <GroupedButtons/>
                    </View>
                    <View style={styles.socialWrapper}>
                        <Icon name="facebook" type="font-awesome" color="white" size={18} 
                        containerStyle={styles.socialIconContainer}/>
                        <Icon name="instagram" type="font-awesome" color="white" size={18} containerStyle={styles.socialIconContainer}/>
                        <Icon name="twitter" type="entypo" color="white" size={18} 
                        containerStyle={styles.socialIconContainer}/>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default DrawerMenu;

const styles = {
    backgroundStyle: {
        height: '100%',
        width: '100%'
    },
    socialWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    socialIconContainer: {
        marginLeft: 40,
        marginBottom: SCREEN_HEIGHT/20
    }
};
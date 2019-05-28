import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon, withBadge } from 'react-native-elements';
import { Switch } from 'react-native-switch';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class StatusItem extends React.Component {

    state = { online: true };

    onToggleStatus(currentValue) {
        this.setState({ online: currentValue });
    }

    render() {
        let BadgedIcon = withBadge(null, { status: this.state.online ? 'success' : 'error',
        badgeStyle: styles.badgeStyle })(Icon);
        return (
            <View style={styles.mainWrapper}>
                <BadgedIcon name="circle" type="feather" color="white" size={19} />
                <Text style={styles.labelStyle}>ONLINE STATUS</Text>
                <Switch value={this.state.online} backgroundActive="rgba(0, 0, 0, 0.4)"
                backgroundInactive="rgba(0, 0, 0, 0.4)" circleActiveColor="white"
                circleInActiveColor="white" onValueChange={val => this.onToggleStatus(val)} 
                barHeight={15} circleSize={15}/>
            </View>
        );
    }
}

export default StatusItem;

const styles = {
    mainWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40,
        marginBottom: SCREEN_HEIGHT/20
    },
    labelStyle: {
        color: 'white',
        fontSize: 12,
        marginLeft: 20,
        marginRight: 40
    },
    badgeStyle: {
        width: 9,
        height: 9,
        marginTop: 8,
        marginRight: 3
    }
};
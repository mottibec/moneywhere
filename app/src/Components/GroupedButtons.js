import React from 'react';
import { View, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../Actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const buttons = {
    first: [ 'CHANGE', 'ATM' ],
    second: [ 'SELL', 'BUY' ]
};

class GroupedButtons extends React.Component {

    state = { firstSelected: 1, secondSelected: 0 };

    componentDidUpdate() {
        let { firstSelected, secondSelected } = this.state;
        this.props.setMode(firstSelected, secondSelected);
    }

    render() {
        return (
            <View style={styles.mainWrapper}>
                <ButtonGroup 
                buttons={buttons.first} selectedIndex={this.state.firstSelected}
                onPress={index => this.setState({ firstSelected: index })} 
                buttonStyle={styles.buttonStyle} textStyle={styles.buttonText}
                containerStyle={styles.buttonContainer} innerBorderStyle={{ color: '#19E9DF' }}
                selectedButtonStyle={styles.selectedButton} selectedTextStyle={styles.selectedText} />
                <ButtonGroup 
                buttons={buttons.second} selectedIndex={this.state.secondSelected}
                onPress={index => this.setState({ secondSelected: index })} 
                buttonStyle={styles.buttonStyle} textStyle={styles.buttonText}
                containerStyle={styles.buttonContainer} innerBorderStyle={{ color: '#19E9DF' }}
                selectedButtonStyle={styles.selectedButton} selectedTextStyle={styles.selectedText} />
            </View>
        );
    }
}

export default withNavigation(connect(null, actions)(GroupedButtons));

const styles = {
    mainWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderColor: '#19E9DF',
        height: 22,
        width: SCREEN_WIDTH/1.35 - 70,
        marginLeft: 40,
        marginBottom: 10
    },
    buttonStyle: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        fontSize: 10
    },
    selectedButton: {
        backgroundColor: '#19E9DF'
    },
    selectedText: {
        color: 'black'
    }
};
import React from 'react';
import { Dimensions } from 'react-native'; 
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import DrawerMenu from '../Components/DrawerMenu';
import HomeScreen from '../Screens/HomeScreen';
import ApprovalScreen from '../Screens/ApprovalScreen';
import TransactionScreen from '../Screens/TransactionScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;

const StackNavigator = createStackNavigator({
    // home: { screen: HomeScreen },
    // approved: { screen: ApprovalScreen },
    transaction: { screen: TransactionScreen }
});

const DrawerNavigator = createDrawerNavigator({
    stack: { screen: StackNavigator }
}, {
    drawerWidth: SCREEN_WIDTH/1.35, 
    contentComponent: props => <DrawerMenu {...props} /> 
});

export const RootNavigator = createAppContainer(DrawerNavigator);
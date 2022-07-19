import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomePage } from '../screens/home/home-page';
import { LoginPage } from '../screens/login/login-page';
import 'react-native-gesture-handler';
const { Navigator, Screen } = createStackNavigator();

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
};
      
const RootStack = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ cardStyle: { backgroundColor: 'transparent' } }}>
            <Screen options={{headerShown: false}} name="Login" component={LoginPage} />
            <Screen name="Home" component={HomePage} />
        </Navigator>
    )
}
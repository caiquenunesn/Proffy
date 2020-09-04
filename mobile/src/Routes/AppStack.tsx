import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Lading from '../pages/Lading';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

const AppStackNavigation = createStackNavigator();

function AppStack(){
    return(
        <NavigationContainer>
            <AppStackNavigation.Navigator screenOptions={{ headerShown: false}}>
                <AppStackNavigation.Screen name="Landing"component={Lading}/>
                <AppStackNavigation.Screen name="GiveClasses"component={GiveClasses}/>
                <AppStackNavigation.Screen name="Study"component={StudyTabs}/>
            </AppStackNavigation.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;
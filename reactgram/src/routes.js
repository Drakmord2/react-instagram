import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';
import Feed from './pages/Feed';

import logo from './assets/instagram.png'

const Routes = createAppContainer(
    createStackNavigator({
        Feed
    }, {
        defaultNavigationOptions: {
            headerTitle: <Image source={logo}/>,
            headerStyle: {
                backgroundColor: '#f5f5f5'
            }
        }
    })
);

export default Routes;

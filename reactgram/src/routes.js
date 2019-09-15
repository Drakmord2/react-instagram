import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image, View } from 'react-native';
import Feed from './pages/Feed';
import logo from './assets/instagram.png'
import {Icon} from "native-base";

const titleItems = () => {
    return (
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon type='AntDesign' name="camerao" style={{flex: 1, paddingLeft:20}}/>
            <Image source={logo} style={{flex: 1}}/>
            <Icon type='AntDesign' name="rocket1" style={{flex: 1, textAlign:'right', paddingRight:20}}/>
        </View>
    );
};

const Routes = createAppContainer(
    createStackNavigator({
        Feed
    }, {
        defaultNavigationOptions: {
            headerTitle: titleItems(),
            headerStyle: {
                backgroundColor: '#f5f5f5'
            }
        }
    })
);

export default Routes;

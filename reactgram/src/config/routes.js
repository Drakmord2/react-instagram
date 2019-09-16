import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image, View } from 'react-native';
import { Icon } from "native-base";

import Feed from '../routes/Feed';
import images from './assets';
import styles from './styles';

const logo = images.navigationHeader.title;

const titleItems = () => {
    return (
        <View style={styles.navigationHeader.items.view}>
            <Icon type='AntDesign' name="camerao" style={styles.navigationHeader.items.icons.camera}/>
            <Image source={logo} style={{flex: 1}}/>
            <Icon type='AntDesign' name="rocket1" style={styles.navigationHeader.items.icons.direct}/>
        </View>
    );
};

const Routes = createAppContainer(
    createStackNavigator({
        Feed
    }, {
        defaultNavigationOptions: {
            headerTitle: titleItems(),
            headerStyle: styles.navigationHeader.header
        }
    })
);

export default Routes;

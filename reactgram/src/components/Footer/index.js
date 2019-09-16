import React from 'react';
import {View} from "react-native";
import {styles} from "./styles";
import {Icon} from "native-base";

export default function Footer() {

    return (
        <View style={styles.feedFooter}>
            <Icon name="home" type='Entypo' style={styles.feedFooterIcon}/>
            <Icon name="magnifier" type='SimpleLineIcons' style={styles.feedFooterIcon}/>
            <Icon name="plussquareo" type='AntDesign' style={styles.feedFooterIcon}/>
            <Icon name="hearto" type='AntDesign' style={styles.feedFooterIcon}/>
            <Icon name="user" type='AntDesign' style={styles.feedFooterIcon}/>
        </View>
    );
}

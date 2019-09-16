import React from 'react';
import {ActionSheet, Icon} from "native-base";

import {Avatar, Description, Footer, Header, More, Name, Post, styles} from "./styles";
import LazyImage from "../LazyImage";
import ClickyIcon from "../ClickyIcon";

export default function PostComponent(props) {
    const item  = props.item;
    const viewable = props.viewable;

    const BUTTONS = ["Unfollow", "Copy Link", "Share to...", "Cancel"];
    const DESTRUCTIVE_INDEX = 0;
    const CANCEL_INDEX = 3;
    const moreSheet = () => {
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX
            },
            buttonIndex => {
                if (BUTTONS[buttonIndex] !== 'Cancel' && BUTTONS[buttonIndex] !== 'Unfollow') {
                    alert(BUTTONS[buttonIndex]);
                }
            }
        )
    };

    return (
        <Post>
            <Header>
                <Avatar source={String(item.author.avatar).search('https') !== -1 ? {uri: item.author.avatar} : item.author.avatar}/>
                <Name>{item.author.name}</Name>
                <More onPress={moreSheet} >...</More>
            </Header>
            <LazyImage
                shouldLoad={viewable.includes(item.id)}
                ratio={item.aspectRatio}
                smallSource={String(item.small).search('https') !== -1 ? {uri:item.small} : item.small}
                source={String(item.image).search('https') !== -1 ? {uri:item.image} : item.image}
            />
            <Footer>
                <ClickyIcon name="hearto" pressedColor='red'/>
                <Icon name="mail" type='AntDesign' style={styles.footerIcon}/>
                <Icon name="rocket1" type='AntDesign' style={styles.footerIcon}/>
                <ClickyIcon name="tago" style={{fontSize:22, flex: 1, textAlign:'right', paddingRight:10}}/>
            </Footer>
            <Description>
                <Name>{item.author.name}</Name> {item.description}
            </Description>
        </Post>
    )
}

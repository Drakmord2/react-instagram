import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Icon, ActionSheet } from 'native-base';
import { styles, Post, Header, Avatar, Name, Description, Loading, More, Footer } from './styles';
import LazyImage from '../../components/LazyImage';
import image from '../../assets/404.jpg';
import imagesmall from '../../assets/404small.jpg';
import avatar from '../../assets/instalogosmall.png';
import ClickyIcon from "../../components/ClickyIcon";

export default function Feed() {
    const [viewable, setViewable] = useState([]);
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [offline, setOffline] = useState(false);
    const BUTTONS = ["Unfollow", "Copy Link", "Share to...", "Cancel"];
    const DESTRUCTIVE_INDEX = 0;
    const CANCEL_INDEX = 3;

    useEffect(() => {
        loadPage();
    }, []);

    async function loadPage(pageNumber=page, shouldRefresh=false) {
        if (offline || (total && pageNumber > total)) {
            return;
        }

        setLoading(true);

        try {
            const controller = new AbortController();
            const signal = controller.signal;

            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(
                `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
                {signal}
            );
            clearTimeout(timeoutId);

            const data = await response.json();
            const totalItems = await response.headers.get('X-Total-Count');

            setFeed(shouldRefresh ? data : [...feed, ...data]);
            setTotal(Math.floor(totalItems / 5));
            setPage(pageNumber + 1);
        } catch (err) {
            const emptyFeed = {
                id: 0,
                author: {
                    id: 0,
                    name: 'Instagram',
                    avatar: avatar
                },
                small: imagesmall,
                image: image,
                aspectRatio: 0.7462,
                description: 'Uh oh! 😱 No posts for you. Check your connection or try again later.'
            };
            const data = [emptyFeed];

            setFeed(shouldRefresh ? data : [...feed, ...data]);
            setTotal(0);
            setOffline(true);
            setPage(1);
        }

        setLoading(false);
    }

    async function refreshList() {
        setRefreshing(true);
        setOffline(false);
        await loadPage(1, true);
        setRefreshing(false);
    }

    const handleViewableChanged = useCallback(({ changed }) => {
        setViewable(changed.map(({ item }) => item.id));
    }, []);

    const endReached = () => {
        if (!loading && total !== 0) {
            loadPage();
        }
    };

    const moreSheet = () => {
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX
            },
            buttonIndex => {
                if (BUTTONS[buttonIndex] !== 'Cancel') {
                    alert(BUTTONS[buttonIndex]);
                }
            }
        )
    };

    const postRender = ({ item }) => (
        <Post>
            <Header>
                <Avatar source={String(item.author.avatar).search('https') !== -1 ? {uri: item.author.avatar} : item.author.avatar}/>
                <Name onPress={()=>alert(item.author.name+"'s Profile")}>
                    {item.author.name}
                </Name>
                <More onPress={moreSheet} >...</More>
            </Header>
            <LazyImage
                shouldLoad={viewable.includes(item.id)}
                ratio={item.aspectRatio}
                smallSource={String(item.small).search('https') !== -1 ? {uri:item.small} : item.small}
                source={String(item.image).search('https') !== -1 ? {uri:item.image} : item.image}
            />
            <Footer>
                <ClickyIcon onPress={()=>alert("Like")} name="hearto" pressedColor='red'/>
                <Icon name="mail" type='AntDesign' style={styles.footerIcon}/>
                <Icon name="rocket1" type='AntDesign' style={styles.footerIcon}/>
                <ClickyIcon name="tago" style={{fontSize:22, flex: 1, textAlign:'right', paddingRight:10}}/>
            </Footer>
            <Description>
                <Name onPress={()=>alert(item.author.name+"'s Profile")}>
                    {item.author.name}
                </Name> {item.description}
            </Description>
        </Post>
    );

    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={post => String(post.id)}
                onViewableItemsChanged={handleViewableChanged}
                viewabilityConfig={{viewAreaCoveragePercentThreshold: 30}}
                onEndReached={endReached}
                onEndReachedThreshold={0.1}
                onRefresh={refreshList}
                refreshing={refreshing}
                ListFooterComponent={loading && <Loading/>}
                renderItem={postRender}
            />
        </View>
    );
}

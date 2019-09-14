import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Post, PostImage, Header, Avatar, Name, Description, Loading } from './styles';
import LazyImage from '../../components/LazyImage';
import image from '../../assets/404.jpg';
import imagesmall from '../../assets/404small.jpg';
import avatar from '../../assets/instalogosmall.png';

const localIP = "";

export default function Feed() {
    const [viewable, setViewable] = useState([]);
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [offline, setOffline] = useState(false);

    async function loadPage(pageNumber=page, shouldRefresh=false) {
        if (offline || (total && pageNumber > total)) {
            return;
        }

        setLoading(true);

        try {
            const controller = new AbortController();
            const signal = controller.signal;

            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const response = await fetch(
                `http://${localIP||'localhost'}:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
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

    useEffect(() => {
        loadPage();
    }, []);

    async function refreshList() {
        setRefreshing(true);
        setOffline(false);
        await loadPage(1, true);
        setRefreshing(false);
    }

    const handleViewableChanged = useCallback(({ changed }) => {
        setViewable(changed.map(({ item }) => item.id));
    }, []);
    
    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={post => String(post.id)}
                onViewableItemsChanged={handleViewableChanged}
                viewabilityConfig={{viewAreaCoveragePercentThreshold: 25}}
                onEndReached={()=>loadPage()}
                onEndReachedThreshold={0.1}
                onRefresh={refreshList}
                refreshing={refreshing}
                ListFooterComponent={loading && <Loading/>}
                renderItem={({ item }) => (
                    <Post>
                        <Header>
                            <Avatar source={String(item.author.avatar).search('https') !== -1 ? {uri: item.author.avatar} : item.author.avatar}/>
                            <Name>{item.author.name}</Name>
                        </Header>
                        <LazyImage
                            shouldLoad={viewable.includes(item.id)}
                            ratio={item.aspectRatio}
                            smallSource={String(item.small).search('https') !== -1 ? {uri:item.small} : item.small}
                            source={String(item.image).search('https') !== -1 ? {uri:item.image} : item.image}
                        />
                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </View>
    );
}

import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import { Loading } from './styles';
import assets from '../../config/assets';
import Post from '../../components/Post';
import Footer from '../../components/Footer';

const image = assets.notFound;
const imagesmall = assets.notFoundSmall;
const avatar = assets.logo;

export default function Feed() {
    const [viewable, setViewable] = useState([]);
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [offline, setOffline] = useState(false);

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

    const postRender = ({ item }) => (
        <Post item={item} viewable={viewable}/>
    );

    return (
        <View style={{flex:1}}>
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
                style={{flex:1}}
            />
        <Footer/>
        </View>
    );
}

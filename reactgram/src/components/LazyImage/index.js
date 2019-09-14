import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { Small, Original } from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({smallSource, source, ratio, shouldLoad}) {
    const opacity = new Animated.Value(0);
    const [loaded, setLoaded] = useState(false);

    function handleAnimate() {
        Animated.timing(opacity, {
            toValue:1,
            duration:500,
            useNativeDriver:true
        }).start();
    }

    useEffect(()=>{
        if (shouldLoad) {
            setLoaded(true);
        }
    },[shouldLoad]);

    return (
        <Small
            source={smallSource}
            ratio={ratio}
            resizeMode="contain"
            blurRadius={2}
        >
        {
            loaded &&
            <OriginalAnimated
                style={{opacity: opacity}}
                source={source}
                ratio={ratio}
                resizeMode="contain"
                onLoadEnd={handleAnimate}
            />
        }
        </Small>
    )
}

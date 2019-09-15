import React, { useState } from 'react';
import { Icon } from 'native-base';
import { styles } from './styles';

export default function ClickyIcon(props) {
    const [pressed, setPressed] = useState(false);
    const [style, setStyle] = useState({...props.style, ...styles.footerIcon});
    const [originalName, setOriginalName] = useState(props.name);
    const [name, setName] = useState(props.name);

    function _pressed() {
        const newState = !pressed;
        setPressed(newState);

        if (newState && props.onPress) {
            props.onPress();
        }

        if (newState && props.pressedColor === 'red') {
            const newStyle = {...props.style, ...styles.footerIconRed};
            setStyle(newStyle);
            setName(String(name).slice(0,-1));
            return;
        }

        if (newState && props.pressedColor !== 'red') {
            const newStyle = {...props.style, ...styles.footerIcon};
            setStyle(newStyle);
            setName(String(name).slice(0,-1));
            return;
        }

        const newStyle = {...props.style, ...styles.footerIcon};
        setStyle(newStyle);
        setName(originalName);
    }

    return (
        <Icon
            name={name}
            type='AntDesign'
            style={style}
            onPress={()=>_pressed()}
        />
    )
};

import styled from 'styled-components/native';
import {StyleSheet, View} from "react-native";

export const Post = styled.View`
    margin-top: 10px;
`;

export const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

export const Footer = styled.View`
    padding-top: 15px;
    padding-left: 15px;
    flex-direction: row;
    align-items: center;
`;

export const PostImage = styled.Image`
    width: 100%;
    aspect-ratio: ${props => props.ratio};
`;

export const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 10px;
`;

export const Name = styled.Text`
    flex: 1;
    color: #333;
    font-weight: bold;
`;

export const Description = styled.Text`
    padding: 15px;
    line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    color: '#999',
    size: 'small'
})`
    margin: 30px 0;
`;

export const More = styled.Text`
    flex: 1;
    line-height: 20px;
    text-align: right;
    font-size: 25px;
    font-weight: bold;
    color: #333;
`;

export const styles = StyleSheet.create({
    footerIcon: {
        fontSize:22,
        marginRight:10
    },
    footerIconRed: {
        fontSize:22,
        marginRight:10,
        color: '#d00'
    },
    feedFooterIcon: {
        fontSize:22
    },
    feedFooter: {
        flex: .08,
        flexDirection: 'row',
        paddingBottom: 8,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#f5f5f5'
    }
});

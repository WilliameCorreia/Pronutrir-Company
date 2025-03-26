import { StyleSheet, Dimensions } from 'react-native';
import { ThemeContextData } from '../contexts/themeContext';
const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme?.colors?.backgroundScreen || '#FFFFFF',
        },
        boxBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imgGif: {
            width: Dimensions.get('screen').width / 5,
            height: Dimensions.get('screen').width / 5,
        },
        img: {
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height / 10,
            paddingHorizontal: 10,
        }
    });
    return styles;
};

export default createStyles;

import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { ThemeContextData } from '../../contexts/themeContext';

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgroundScreen,
            justifyContent: 'center',
        },
        box1: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        box2: {
            width: (Dimensions.get('screen').width),
            height: (Dimensions.get('screen').height / 15),
            justifyContent: 'center',
            alignItems: 'center',
        },
        textInfo: {
            textAlign: 'center',
            fontSize: theme.typography.SIZE.fontysize24,
            fontFamily: theme.typography.FONTES.Bold,
            color: theme.colors.text_secondary,
            letterSpacing: theme.typography.LETTERSPACING.S
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            color: theme.colors.text_primary,
            letterSpacing: theme.typography.LETTERSPACING.S
        },
        input: {
            flex: 1,
            fontSize: RFValue(20, 680),
            textAlign: 'center',
            marginLeft: 30,
            color: '#7A8B8E'
        },
        sectionInput: {
            flexDirection: 'row',
            width: '80%',
            height: (Dimensions.get('screen').height / 12),
            borderBottomColor: '#DBCCCC',
            borderBottomWidth: 2,
            alignItems: 'center'
        },
        Error: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Regular,
            color: theme.colors.error,
            letterSpacing: theme.typography.LETTERSPACING.S
        },
        BackgroundImage: {
            flex: 1,
            resizeMode: 'cover'
        },
        btnRecovery: {
            marginTop: 10
        }
    })
    return styles;
};

export default createStyles;

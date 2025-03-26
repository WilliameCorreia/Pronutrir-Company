import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import ButtonExample from '../../components/examples/ButtonExample';

export default function Busca() {

    const styles = useThemeAwareObject(createStyles);

    return (
        <View style={styles.container}>
            <ButtonExample />
        </View>
    )
}

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgroundScreen,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Bold,
            color: theme.colors.text_primary,
            letterSpacing: theme.typography.LETTERSPACING.S
        }
    });
    return styles;
};
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import CardExample from '../../examples/CardExample';
import PressableCardExample from '../../examples/PressableCardExample';
import PressableCard from '../../components/cards/pressableCard';
import PressableRipple from '../../components/ripple/PressableRipple';

export default function Perfil() {

    const styles = useThemeAwareObject(createStyles);

    return (
        <View style={styles.container}>
            <PressableRipple>
                <View style={{ width: 500, height: 500, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>Perfil</Text>
                </View>
            </PressableRipple>
        </View>
    )
}

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: 'center',
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Bold,
            color: theme.colors.text_primary,
            letterSpacing: theme.typography.LETTERSPACING.S
        }
    });
    return styles;
};
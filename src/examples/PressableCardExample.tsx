import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import PressableCard from '../components/cards/pressableCard';
import useTheme from '../hooks/useTheme';
import { useThemeAwareObject } from '../hooks/useThemedStyles';
import { ThemeContextData } from '../contexts/themeContext';

const PressableCardExample: React.FC = () => {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);
    const [pressCount, setPressCount] = useState(0);

    const handlePress = () => {
        setPressCount(pressCount + 1);
        Alert.alert("Pressionado!", `Você pressionou o cartão ${pressCount + 1} vezes.`);
    };

    const handleLongPress = () => {
        Alert.alert("Pressão longa!", "Você manteve o card pressionado.");
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>PressableCard - Demonstração</Text>

            <Text style={styles.subtitle}>Card com Efeito Ripple (Android)</Text>
            <PressableCard
                onPress={handlePress}
                style={styles.card}
                elevation={3}
                rippleColor={theme.colors.primary + '40'}
            >
                <Text style={styles.cardTitle}>Card Pressable Básico</Text>
                <Text style={styles.cardText}>
                    Este card usa o componente Pressable e tem efeito ripple no Android.
                    Toque para ver o efeito.
                </Text>
                <Text style={styles.counter}>Contagem de toques: {pressCount}</Text>
            </PressableCard>

            <Text style={styles.subtitle}>Card com Pressão Longa</Text>
            <PressableCard
                onLongPress={handleLongPress}
                style={styles.card}
                variant="outlined"
                elevation={1}
                delayLongPress={500}
            >
                <Text style={styles.cardTitle}>Pressão Longa</Text>
                <Text style={styles.cardText}>
                    Mantenha pressionado este card por um momento para ver
                    o evento de pressão longa sendo acionado.
                </Text>
            </PressableCard>

            <Text style={styles.subtitle}>Feedback Visual ao Pressionar</Text>
            <PressableCard
                onPress={() => { }}
                onPressIn={() => console.log("Pressionado")}
                onPressOut={() => console.log("Solto")}
                style={styles.card}
                elevation={4}
            >
                <Text style={styles.cardTitle}>Feedback Visual</Text>
                <Text style={styles.cardText}>
                    Este card tem feedback visual quando pressionado.
                    A sombra e o tamanho mudam levemente.
                </Text>
            </PressableCard>

            <Text style={styles.subtitle}>Variantes de Card</Text>
            <View style={styles.row}>
                <PressableCard
                    onPress={() => Alert.alert("Default")}
                    style={styles.smallCard}
                    elevation={2}
                >
                    <Text style={styles.smallCardText}>Default</Text>
                </PressableCard>

                <PressableCard
                    onPress={() => Alert.alert("Outlined")}
                    style={styles.smallCard}
                    variant="outlined"
                >
                    <Text style={styles.smallCardText}>Outlined</Text>
                </PressableCard>

                <PressableCard
                    onPress={() => Alert.alert("Flat")}
                    style={styles.smallCard}
                    variant="flat"
                >
                    <Text style={styles.smallCardText}>Flat</Text>
                </PressableCard>
            </View>
        </ScrollView>
    );
};

const createStyles = (theme: ThemeContextData) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgroundScreen,
        },
        content: {
            padding: 16,
            paddingBottom: 40,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 20,
            textAlign: 'center',
        },
        subtitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginTop: 20,
            marginBottom: 10,
        },
        card: {
            marginBottom: 16,
        },
        cardTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 8,
        },
        cardText: {
            fontSize: 14,
            color: theme.colors.text_primary,
            marginBottom: 8,
        },
        counter: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.colors.primary,
            marginTop: 8,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
        },
        smallCard: {
            width: '31%',
            padding: 8,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        smallCardText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.colors.text_secondary,
            textAlign: 'center',
        }
    });
};

export default PressableCardExample;

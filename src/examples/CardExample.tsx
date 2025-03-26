import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/cards/card';
import useTheme from '../hooks/useTheme';
import { useThemeAwareObject } from '../hooks/useThemedStyles';
import { ThemeContextData } from '../contexts/themeContext';

const CardExample: React.FC = () => {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Card Básico */}
                <Card style={styles.card}>
                    <Text style={styles.title}>Card Básico</Text>
                    <Text style={styles.text}>
                        Este é um exemplo simples do componente Card.
                    </Text>
                </Card>

                {/* Card com Contorno */}
                <Card variant="outlined" style={styles.card}>
                    <Text style={styles.title}>Card com Contorno</Text>
                    <Text style={styles.text}>
                        Um exemplo de card com variante "outlined".
                    </Text>
                </Card>

                {/* Card com Elevação */}
                <Card elevation={5} style={styles.card}>
                    <Text style={styles.title}>Card com Elevação</Text>
                    <Text style={styles.text}>
                        Este card tem uma elevação maior, com sombra mais pronunciada.
                    </Text>
                </Card>
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
        },
        card: {
            marginBottom: 16,
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 8,
        },
        text: {
            fontSize: 14,
            color: theme.colors.text_primary,
        }
    });
};

export default CardExample;

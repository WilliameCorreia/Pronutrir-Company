import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import PressableRipple from '../ripple/PressableRipple';

interface PressableCardProps {
    title?: string;
    description?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

const PressableCard: React.FC<PressableCardProps> = ({
    title = 'Title',
    description = 'Description',
    onPress,
    style,
    contentStyle,
    children,
}) => {
    return (
        <PressableRipple
            onTap={onPress}
            style={[styles.card, style]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {children}
        </PressableRipple>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: 'red',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        margin: 8,
    },
    cardContent: {
        //padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export default PressableCard;

import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';

interface Props {
    onPress(): void;
}

const BackButton: React.FC<Props> = ({ onPress }: Props) => {

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Feather
                    name="corner-up-left"
                    color={theme.colors.fill}
                    size={RFPercentage(3.5)}
                />
            </TouchableOpacity>
        </View>
    );
};

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        btn: {
            width: RFPercentage(5),
            height: RFPercentage(5),
            margin: 10,
            padding: 5,
            backgroundColor: theme.colors.backgroundTabBottom,
            justifyContent: 'center',
            alignItems: 'center',
            ...Platform.select({
                ios: {
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                },
                android: {
                    elevation: 3,
                },
            }),
            borderRadius: 30,
        },
    });
    return styles;
};



export default BackButton;

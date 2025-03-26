import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContextData } from '../../contexts/themeContext';

interface Props {
    valueText: string;
    onPress(): void;
}

const BtnNext: React.FC<Props> = ({ onPress, valueText }: Props) => {
    const styles = useThemeAwareObject(createStyles);
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#52b4ad', '#219f96', '#08948a']}
                style={styles.linearGradient}>
                <TouchableOpacity style={styles.btn} onPress={onPress}>
                    <Text style={styles.text}>
                        {valueText ? valueText : 'Prosseguir'}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
        },
        text: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.text_tertiary,
            fontSize: theme.typography.SIZE.fontysize22,
            textAlign: 'center',
        },
        btn: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        linearGradient: {
            flex: 1,
            width: RFPercentage(30),
            height: RFPercentage(5),
            borderRadius: 30,
            marginVertical: 5,
            ...Platform.select({
                android: {
                    elevation: 3,
                },
                ios: {
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                },
                default: {
                    elevation: 3,
                },
            }),
        },
    });
    return styles;
};

export default BtnNext;

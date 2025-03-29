import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import Button from '../Button';

interface Props {
    onPress(): void;
}

const BackButton: React.FC<Props> = ({ onPress }: Props) => {

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
        <Button 
            icon={<Feather name="corner-up-left" size={25} color="#FFF" />}
            shape="circle" 
            variant="primary" 
            size="large"
            style={styles.circleButtonLarge}
            elevated
          />
    );
};

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        circleButtonLarge: {
            width: 56,
            height: 56,
            borderRadius: 28,
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            margin: RFPercentage(1),
          },
    });
    return styles;
};



export default BackButton;

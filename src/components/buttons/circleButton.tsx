import React from 'react';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import Button from '../Button';

interface Props {
    onPress(): void;
    icon?: React.ReactNode | null;
}

const CicleButton: React.FC<Props> = ({ onPress, icon }: Props) => {

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
        <Button 
            icon={ icon ?? <Feather name="corner-up-left" size={25} color="#000000" />}
            shape="circle" 
            variant="secondary" 
            size="large"
            style={styles.circleButtonLarge}
            elevated
            onPress={onPress}
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
            backgroundColor: theme.colors.buttonBackground,
          },
    });
    return styles;
};



export default CicleButton;

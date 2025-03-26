import React from 'react';
import { View, ImageBackground } from 'react-native';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

import Homestyles from './style';
//import BtnNext from '../../components/buttons/btnNext';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../../hooks/useTheme';
import CarouselHome from '../../components/carousel/carouselHome';
import LogoNameSvg from '../../../assets/svg/logoNameSvg';
import BtnNext from '../../components/buttons/btnNext';
import { StackNavigation } from '../../routes/stack.routes';

export default function Home() {

    const theme = useTheme();
    const styles = useThemeAwareObject(Homestyles);
    const navigation = useNavigation<StackNavigation>();

    return (
        <View style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                resizeMode={'cover'}
                source={require('../../../assets/images/LogoPronutrirBackground.png')}>
                <View style={styles.box1}>
                    <View style={styles.img}>
                        <LogoNameSvg fill={theme.colors.text} />
                    </View>
                </View>
                <View style={styles.box2}>
                    <CarouselHome />
                </View>
                <View style={styles.box3}>
                    <BtnNext
                        valueText="Começar"
                        onPress={() => navigation.navigate("LoginCpf")}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

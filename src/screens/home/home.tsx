import React from 'react';
import { View, ImageBackground } from 'react-native';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

//import BtnNext from '../../components/buttons/btnNext';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../../hooks/useTheme';
import CarouselHome from '../../components/carousel/carouselHome';
import LogoNameSvg from '../../../assets/svg/logoNameSvg';
import BtnNext from '../../components/buttons/btnNext';
import { StackNavigation } from '../../routes/stack.routes';
import createStyles from './style';
import Button from '../../components/Button';

export default function Home() {

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);
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
                    <Button
                        title="Começar"
                        variant="primary"
                        size="large"
                        shape="pill"
                        onPress={() => navigation.navigate("LoginCpf")}
                        style={{width: '50%'}}
                        textStyle={{ fontSize: 25 }}
                        elevated
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

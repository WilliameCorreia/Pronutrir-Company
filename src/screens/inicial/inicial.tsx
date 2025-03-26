import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import LogoNameSvg from '../../../assets/svg/logoNameSvg';

import _styles from './style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

export default function Inicial() {
    const styles = useThemeAwareObject(_styles);

    const [orientacao, setOrientacao] = useState<ScreenOrientation.OrientationChangeEvent>();

    useEffect(() => {
        ScreenOrientation.getOrientationAsync().then(props => console.log(props));
        const subscription = ScreenOrientation.addOrientationChangeListener((props) => setOrientacao(props));
        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);

    return (
        <View testID="container" style={styles?.container || { flex: 1 }}>
            <ImageBackground style={styles?.boxBackground || { flex: 1 }} resizeMode={'cover'} source={require('../../assets/images/LogoPronutrirBackground.png')}>
                <View>
                    <AnimatedLottieView
                        source={require('../../assets/animated/logoAnimated.json')}
                        autoPlay={true}
                        loop={true}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
                <View>
                    <View style={styles?.img || {}}>
                        <LogoNameSvg width={RFPercentage(10)} height={RFPercentage(10)} fill={"#000000"} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
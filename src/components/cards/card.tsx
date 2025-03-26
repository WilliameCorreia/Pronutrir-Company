import React, { ReactNode, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    Dimensions,
    PixelRatio,
    Platform,
    ScaledSize,
    DimensionValue
} from 'react-native';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
interface CardProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    elevation?: number;
    variant?: 'default' | 'outlined' | 'flat';
    width?: DimensionValue;
    height?: DimensionValue;
    onPress?: () => void;
    disabled?: boolean;
    borderRadius?: number;
    padded?: boolean;
    testID?: string;
}

const Card: React.FC<CardProps> = ({
    children,
    style,
    contentStyle,
    elevation = 2,
    variant = 'default',
    width,
    height,
    onPress,
    disabled = false,
    borderRadius,
    padded = true,
    testID
}) => {
    // Estado para armazenar as dimensões atuais da tela
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    // Escuta mudanças nas dimensões da tela (rotação, redimensionamento)
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(window);
        });

        return () => subscription?.remove();
    }, []);

    const theme = useTheme();
    const styles = useThemeAwareObject(() =>
        createStyles(
            theme,
            dimensions,
            {
                elevation,
                variant,
                width,
                height,
                borderRadius,
                padded
            }
        )
    );

    // Gera o estilo de sombra com base na elevação
    const shadowStyle = elevation > 0 && variant !== 'flat' ? getShadowStyle(elevation) : {};

    // Determina estilos com base nas props
    const cardStyle = [
        styles.card,
        styles[`${variant}Card`],
        shadowStyle,
        style
    ];

    const touchableStyle: ViewStyle = onPress ? {
        width: width ? width : '100%',
        height: height,
        alignSelf: width ? undefined : 'stretch'
    } : {};

    const container = (
        <View
            style={cardStyle}
            testID={testID}
        >
            <View style={[styles.content, contentStyle]}>
                {children}
            </View>
        </View>
    );

    // Se tiver onPress, envolve com TouchableOpacity
    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.8}
                style={touchableStyle}
            >
                {container}
            </TouchableOpacity>
        );
    }

    // Caso contrário, retorna apenas o container
    return container;
};

// Função auxiliar para gerar estilos de sombra baseados no nível de elevação
const getShadowStyle = (elevation: number): ViewStyle => {
    return Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: Math.min(elevation / 2, 3),
            },
            shadowOpacity: Math.min(0.1 * elevation, 0.5),
            shadowRadius: Math.min(elevation, 5),
        },
        android: {
            elevation: elevation,
        },
        default: {}
    }) as ViewStyle;
};
type StyleOptions = {
    elevation: number;
    variant: 'default' | 'outlined' | 'flat';
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    padded: boolean;
};

const createStyles = (
    theme: ThemeContextData,
    dimensions: ScaledSize,
    options: StyleOptions
) => {
    const { width, height } = dimensions;
    const isSmallDevice = width < 375;
    const isLandscape = width > height;

    // Fator de escala baseado no tamanho da tela
    const scale = Math.min(width / 400, 1.2);

    // Função para escalar valores de acordo com o tamanho da tela
    const scaledSize = (size: number): number => {
        return Math.round(size * scale);
    };

    // Determinar o raio da borda
    const borderRadiusValue = options.borderRadius !== undefined
        ? scaledSize(options.borderRadius)
        : scaledSize(8);

    // Determinar o padding com base na propriedade padded
    const paddingValue = options.padded
        ? scaledSize(isSmallDevice ? 12 : 16)
        : 0;

    return StyleSheet.create({
        touchable: {
            // Estilo vazio, mantido para compatibilidade
        },
        card: {
            backgroundColor: theme.colors.buttonBackground,
            borderRadius: borderRadiusValue,
            overflow: 'hidden',
            width: options.width || '100%',
            height: options.height || 'auto',
            maxWidth: isLandscape ? '95%' : '100%',
            // Correção da tipagem para spread de objeto em StyleSheet
            ...(isSmallDevice ? {
                maxWidth: width * 0.95,
            } : {})
        },
        defaultCard: {
            backgroundColor: theme.colors.buttonBackground,
        },
        outlinedCard: {
            backgroundColor: 'transparent',
            borderWidth: PixelRatio.get() >= 2 ? 1 : 1.5,
            borderColor: theme.colors.border,
        },
        flatCard: {
            backgroundColor: 'transparent',
        },
        content: {
            padding: paddingValue,
            flex: 1,
        },
    });
};

export default Card;

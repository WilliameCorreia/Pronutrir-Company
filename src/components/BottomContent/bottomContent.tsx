import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ThemeContextData } from "../../contexts/themeContext";
import { useThemeAwareObject } from "../../hooks/useThemedStyles";
import useTheme from "../../hooks/useTheme";
import { RFValue } from 'react-native-responsive-fontsize';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type IconType = "menu" | "home" | "search" | "person";

const iconMap: Record<string, IconType> = {
    "menu": "menu",
    "inicio": "home",
    "busca": "search",
    "perfil": "person"
};

export default function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    // Calcula o tamanho do ícone baseado na largura da tela
    const iconSize = useMemo(() => {
        const baseSize = 25;
        // Ajuste para telas pequenas (menos de 360px)
        if (screenWidth < 360) return baseSize * 0.8;
        // Ajuste para telas grandes (mais de 480px)
        if (screenWidth > 480) return baseSize * 1.2;
        return baseSize;
    }, [screenWidth]);

    return (
        <View style={styles.container}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    if (label === "menu") {
                        navigation.dispatch(DrawerActions.openDrawer())
                        return;
                    }

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const RenderIcon = (label: string, isFocused: boolean) => {
                    const iconName = iconMap[label];
                    return (
                        <View style={styles.btnContent}>
                            <View style={styles.btnItem}>
                                <Ionicons
                                    name={iconName}
                                    color={isFocused ? theme.colors.active : theme.colors.fill}
                                    size={iconSize}
                                />
                            </View>
                            <View style={styles.btnItem}>
                                <Text
                                    style={[
                                        styles.text,
                                        { color: isFocused ? theme.colors.active : theme.colors.text_primary }
                                    ]}
                                    numberOfLines={1}
                                >
                                    {label}
                                </Text>
                            </View>
                        </View>
                    );
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.boxBtn}
                        activeOpacity={0.7}
                    >
                        {RenderIcon(label, isFocused)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const createStyles = (theme: ThemeContextData) => {
    // Calcula altura do tab bar baseado no tamanho da tela
    const tabBarHeight = screenHeight * 0.08; // 8% da altura da tela
    const maxTabBarHeight = 70; // Altura máxima
    const minTabBarHeight = 50; // Altura mínima

    // Limita a altura entre min e max
    const finalTabBarHeight = Math.min(Math.max(tabBarHeight, minTabBarHeight), maxTabBarHeight);

    return StyleSheet.create({
        container: {
            height: finalTabBarHeight,
            paddingVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: theme.colors.backgroundTabBottom,
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
                android: {
                    elevation: 8,
                },
            }),
        },
        boxBtn: {
            flex: 1,
            margin: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
        },
        btnContent: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: RFValue(11, screenHeight),
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            textAlign: 'center',
            marginTop: 2,
        },
        btnItem: {
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
}

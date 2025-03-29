import React from 'react';
//import Dashboard from '../pages/dashboard/dashboard';
//import LoginPassword from '../pages/login/loginPassword';
//import Busca from '../pages/buscar/busca';
//import Perfil from '../pages/perfil/perfil';
//import Home from '../pages/home/home';
//import { TransitionPresets } from '@react-navigation/stack';
//import LoginCpf from '../pages/login/loginCpf';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Home from '../screens/home/home';
import LoginPassword from '../screens/login/loginPassword';
import LoginCpf from '../screens/login/loginCpf';
import { ButtonExamples, CardExamples, ComponentsShowcase } from '../screens/Examples';
import PainelSenha from '../screens/painelSenha/PainelSenha';
import DashBoard from '../screens/dashboard/dashboard';

export type RootStackParamList = {
    Dashboard: undefined;
    Home: undefined;
    LoginPassword: undefined;
    LoginCpf: undefined;
    Busca: undefined;
    Perfil: undefined;
};

export type RootStackParamListExemples = {
    ButtonExamples: undefined;
    CardExamples: undefined;
    ComponentsShowcase: undefined;
}

export type RootStackParamListDashboard = {
    DashBoard: undefined;
    PainelSenha: undefined;
}

const StackDashboard = createNativeStackNavigator<RootStackParamListDashboard>();
export type StackNavigationDashboard = NativeStackNavigationProp<RootStackParamListDashboard>;

const StackExemples = createNativeStackNavigator<RootStackParamListExemples>();
export type StackNavigationExemples = NativeStackNavigationProp<RootStackParamListExemples>;

const Stack = createNativeStackNavigator<RootStackParamList>();
export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;

/* function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name='Busca' component={Busca} />
            <Stack.Screen name='Perfil' component={Perfil} />
        </Stack.Navigator>
    )
} */

function StackRoutesApp() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                animation: 'fade',
            }}
        >
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='LoginPassword' component={LoginPassword} options={{ headerShown: false }} />
            <Stack.Screen name='LoginCpf' component={LoginCpf} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function StackRoutesExemples() {
    return (
        <StackExemples.Navigator
            initialRouteName="ComponentsShowcase"
            screenOptions={{
                animation: 'fade',
            }}
        >
            <StackExemples.Screen name='ComponentsShowcase' component={ComponentsShowcase} options={{ headerShown: false }} />
            <StackExemples.Screen name='ButtonExamples' component={ButtonExamples} options={{ headerShown: false }} />
            <StackExemples.Screen name='CardExamples' component={CardExamples} options={{ headerShown: false }} />
        </StackExemples.Navigator>
    )
}

function StackRoutesDashboard() {
    return (
        <StackDashboard.Navigator
            initialRouteName="DashBoard"
            screenOptions={{
                animation: 'fade',
            }}
        >
            <StackDashboard.Screen name='DashBoard' component={DashBoard} options={{ headerShown: false }} />
            <StackDashboard.Screen name='PainelSenha' component={PainelSenha} options={{ headerShown: false }} />
        </StackDashboard.Navigator>
    )
}

export { StackRoutesApp, StackRoutesExemples, StackRoutesDashboard };
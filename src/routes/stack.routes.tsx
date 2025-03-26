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

export type RootStackParamList = {
    Dashboard: undefined;
    Home: undefined;
    LoginPassword: undefined;
    LoginCpf: undefined;
    Busca: undefined;
    Perfil: undefined;
};

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

export { /* StackRoutes, */ StackRoutesApp }
import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent/drawerContent';
import { StackRoutesApp } from './stack.routes';
import TabRoutes from './tab.routes';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator
            initialRouteName='home'
            drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
            screenOptions={{ drawerStyle: { flex: 1 } }}
        >
            <Drawer.Screen name='home' component={TabRoutes} options={{ headerShown: false }} />
            <Drawer.Screen name='Login' component={StackRoutesApp} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}
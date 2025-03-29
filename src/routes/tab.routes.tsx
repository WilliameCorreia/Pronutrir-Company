import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import MyTabBar from '../components/BottomContent/bottomContent';
import Dashboard from '../screens/dashboard/dashboard';
import Busca from '../screens/buscar/busca';
import Perfil from '../screens/perfil/perfil';
import { StackRoutesDashboard } from './stack.routes';


const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
    return (
        <Tab.Navigator initialRouteName='inicio' tabBar={(props: BottomTabBarProps) => <MyTabBar {...props} />}>
            <Tab.Screen
                name="menu"
                component={Dashboard}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="inicio"
                component={StackRoutesDashboard}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="busca"
                component={Busca}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="perfil"
                component={Perfil}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            
        </Tab.Navigator>
    );
}

export default TabRoutes;
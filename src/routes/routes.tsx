import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { ThemeProvider } from '../contexts/themeContext';
import { StackRoutesApp, StackRoutesDashboard, StackRoutesExemples } from './stack.routes';
import Inicial from '../screens/Inicial';
import DrawerRoutes from './drawer.routes';
import AuthContext from '../contexts/auth';

type Props = {}

const Routes = (props: Props) => {

    const { signed, loading } = useContext(AuthContext);

    //const signed: boolean = false;
    //const loading: boolean = false;

    //return <StackRoutesExemples />

    if (loading) {
        return (<Inicial />);
    }

    if (signed) {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: 'black',
            }}
                edges={Platform.OS == 'android' ? ['top'] : ['top']}>
                <ThemeProvider>
                    <DrawerRoutes />
                </ThemeProvider>
            </SafeAreaView>
        );
    }

    return <StackRoutesApp />;
}

export default Routes;
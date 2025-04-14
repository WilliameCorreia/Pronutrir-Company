import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './routes';
import { FirebaseProvider } from '../contexts/firebaseContext';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../contexts/themeContext';
import { AuthProvider } from '../contexts/auth';
import { PrintBluetoothProvider } from '../contexts/printBluetoothContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export default function Index() {
    return (
        <NavigationContainer>
            <FirebaseProvider>
                <ThemeProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <PrintBluetoothProvider>
                                <Routes />
                            </PrintBluetoothProvider>
                        </AuthProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </FirebaseProvider>
        </NavigationContainer>

    );
}
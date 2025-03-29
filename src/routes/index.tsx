import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './routes';
import { FirebaseProvider } from '../contexts/firebaseContext';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../contexts/themeContext';
import { AuthProvider } from '../contexts/auth';



export default function Index() {
    return (
        <NavigationContainer>
            <FirebaseProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <Routes />
                    </AuthProvider>
                </ThemeProvider>
            </FirebaseProvider>
        </NavigationContainer>

    );
}
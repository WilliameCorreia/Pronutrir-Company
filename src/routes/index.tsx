import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './routes';
import { FirebaseProvider } from '../contexts/firebaseContext';
import { NavigationContainer } from '@react-navigation/native';



export default function Index() {
    return (
        <NavigationContainer>
            <FirebaseProvider>
                <Routes />
            </FirebaseProvider>
        </NavigationContainer>

    );
}
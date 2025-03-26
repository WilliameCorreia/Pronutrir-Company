import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

// Importe a configuração do Firebase
import firebaseApp from '../firebaseConfig';
import { getStorage } from 'firebase/storage';

// Defina o que o contexto vai fornecer
interface FirebaseContextData {
    app: any;
    storage: any;
    // Adicione outros serviços conforme necessário
}

const FirebaseContext = createContext<FirebaseContextData | null>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [firebaseServices, setFirebaseServices] = useState<FirebaseContextData | null>(null);

    useEffect(() => {
        // Inicialize os serviços do Firebase
        const storage = getStorage(firebaseApp);

        setFirebaseServices({
            app: firebaseApp,
            storage
            // Adicione outros serviços aqui
        });

        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Inicializando Firebase...</Text>
            </View>
        );
    }

    return (
        <FirebaseContext.Provider value={firebaseServices}>
            {children}
        </FirebaseContext.Provider>
    );
};

// Hook para usar o contexto
export const useFirebase = () => {
    const context = useContext(FirebaseContext);

    if (!context) {
        throw new Error('useFirebase deve ser usado dentro de um FirebaseProvider');
    }

    return context;
};
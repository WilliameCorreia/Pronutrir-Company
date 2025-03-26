import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../buttons/btn';

const ButtonExample = () => {
    const [loading, setLoading] = useState(false);

    const handlePressWithLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            {/* Tipos diferentes de botões */}
            <Button
                title="Botão Primário"
                onPress={() => console.log('Botão primário pressionado')}
                type="primary"
            />

            <View style={styles.spacer} />

            <Button
                title="Botão Secundário"
                onPress={() => console.log('Botão secundário pressionado')}
                type="secondary"
            />

            <View style={styles.spacer} />

            <Button
                title="Botão Outline"
                onPress={() => console.log('Botão outline pressionado')}
                type="outline"
            />

            <View style={styles.spacer} />

            <Button
                title="Botão de Texto"
                onPress={() => console.log('Botão de texto pressionado')}
                type="text"
            />

            <View style={styles.spacer} />

            {/* Botão com ícone */}
            <Button
                title="Login com Facebook"
                onPress={() => console.log('Login com Facebook')}
                icon="facebook"
            />

            <View style={styles.spacer} />

            {/* Botão com ícone à direita */}
            <Button
                title="Próximo"
                onPress={() => console.log('Próximo')}
                icon="arrow-right"
                iconPosition="right"
            />

            <View style={styles.spacer} />

            {/* Botão com loading */}
            <Button
                title="Enviar"
                onPress={handlePressWithLoading}
                loading={loading}
            />

            <View style={styles.spacer} />

            {/* Botão desabilitado */}
            <Button
                title="Desabilitado"
                onPress={() => console.log('Não deve ser chamado')}
                disabled={true}
            />

            <View style={styles.spacer} />

            {/* Botões de diferentes tamanhos */}
            <Button
                title="Pequeno"
                onPress={() => console.log('Botão pequeno')}
                size="small"
            />

            <View style={styles.spacer} />

            <Button
                title="Grande"
                onPress={() => console.log('Botão grande')}
                size="large"
            />

            <View style={styles.spacer} />

            {/* Botões com diferentes elevações */}
            <Button
                title="Sem elevação"
                onPress={() => console.log('Sem elevação')}
                elevation={0}
            />

            <View style={styles.spacer} />

            <Button
                title="Elevação Baixa"
                onPress={() => console.log('Elevação baixa')}
                elevation={2}
            />

            <View style={styles.spacer} />

            <Button
                title="Elevação Média"
                onPress={() => console.log('Elevação média')}
                elevation={4}
            />

            <View style={styles.spacer} />

            <Button
                title="Elevação Alta"
                onPress={() => console.log('Elevação alta')}
                elevation={8}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    spacer: {
        height: 16,
    },
});

export default ButtonExample;

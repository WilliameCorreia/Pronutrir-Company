import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { Feather } from '@expo/vector-icons';

const ButtonExamples = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Variantes</Text>
      <View style={styles.section}>
        <Button title="Botão Primário" variant="primary" />
        <Button title="Botão Secundário" variant="secondary" />
        <Button title="Botão Outline" variant="outline" />
        <Button title="Botão Desabilitado" disabled />
        <Button title="Carregando" loading />
      </View>

      <Text style={styles.sectionTitle}>Tamanhos</Text>
      <View style={styles.section}>
        <Button title="Botão Pequeno" size="small" />
        <Button title="Botão Médio" size="medium" />
        <Button title="Botão Grande" size="large" />
      </View>

      <Text style={styles.sectionTitle}>Formatos</Text>
      <View style={styles.section}>
        <Button title="Arredondado" shape="rounded" />
        <Button title="Quadrado" shape="square" />
        <Button title="Cápsula" shape="pill" />
      </View>

      <Text style={styles.sectionTitle}>Com Ícones</Text>
      <View style={styles.section}>
        <Button 
          title="Com Ícone" 
          icon={<Feather name="check" size={18} color="#FFF" style={styles.icon} />}
        />
        <Button 
          title="Outline com Ícone" 
          variant="outline" 
          icon={<Feather name="heart" size={18} color="#FF6B6B" style={styles.icon} />}
        />
      </View>

      <Text style={styles.sectionTitle}>Combinações</Text>
      <View style={styles.section}>
        <Button 
          title="Primário Grande Cápsula" 
          variant="primary" 
          size="large" 
          shape="pill" 
        />
        <Button 
          title="Outline Pequeno" 
          variant="outline" 
          size="small" 
          shape="rounded" 
        />
        <Button 
          title="Secundário Quadrado" 
          variant="secondary" 
          size="medium" 
          shape="square" 
          icon={<Feather name="save" size={18} color="#FFF" style={styles.icon} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  icon: {
    marginRight: 8,
  },
});

export default ButtonExamples;

import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { Feather } from '@expo/vector-icons';

const ButtonExamples = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Exemplos de Botões</Text>
      
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

      <Text style={styles.sectionTitle}>Botões Redondos</Text>
      <View style={styles.section}>
        <View style={styles.rowContainer}>
          <Button 
            icon={<Feather name="plus" size={15} color="#FFF" />}
            shape="circle" 
            variant="primary" 
            style={styles.circleButton}
          />
          <Button 
            icon={<Feather name="edit-2" size={20} color="#666" />}
            shape="circle" 
            variant="outline" 
            style={styles.circleButton}
          />
          <Button 
            icon={<Feather name="trash-2" size={20} color="#FFF" />}
            shape="circle" 
            variant="secondary" 
            style={styles.circleButton}
          />
        </View>
        <View style={styles.rowContainer}>
          <Button 
            icon={<Feather name="camera" size={24} color="#FFF" />}
            shape="circle" 
            variant="primary" 
            size="large"
            style={styles.circleButtonLarge}
          />
          <Button 
            icon={<Feather name="heart" size={24} color="#FF6B6B" />}
            shape="circle" 
            variant="outline" 
            size="large"
            style={styles.circleButtonLarge}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Botões com Elevação</Text>
      <View style={styles.section}>
        <Button 
          title="Primário com Elevação" 
          variant="primary" 
          elevated
        />
        <Button 
          title="Secundário com Elevação" 
          variant="secondary" 
          elevated
        />
        <Button 
          title="Outline com Elevação" 
          variant="outline" 
          elevated
          style={{ backgroundColor: '#FFF' }}
        />
        <Button 
          title="Com Ícone e Elevação" 
          elevated
          icon={<Feather name="check" size={18} color="#FFF" style={styles.icon} />}
        />
      </View>

      <Text style={styles.sectionTitle}>Botões Redondos com Elevação</Text>
      <View style={styles.section}>
        <View style={styles.rowContainer}>
          <Button 
            icon={<Feather name="plus" size={15} color="#FFF" />}
            shape="circle" 
            variant="primary" 
            style={styles.circleButton}
            elevated
          />
          <Button 
            icon={<Feather name="camera" size={24} color="#FFF" />}
            shape="circle" 
            variant="primary" 
            size="large"
            style={styles.circleButtonLarge}
            elevated
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 100
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  circleButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1818',
  },
  circleButtonLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonExamples;

import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationExemples } from '../../routes/stack.routes';

// Atualizando para mostrar apenas as categorias que temos exemplos disponíveis
const componentCategories = [
  {
    name: 'Botões',
    route: 'ButtonExamples',
    description: 'Diferentes variantes, tamanhos e formatos de botões',
  },
  {
    name: 'Cards',
    route: 'CardExamples',
    description: 'Cards simples e cards pressionáveis com diferentes estilos',
  }
];

const ComponentsShowcase = () => {
  const navigation = useNavigation<StackNavigationExemples>();
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Catálogo de Componentes</Text>
      <Text style={styles.subtitle}>
        Explore os componentes disponíveis no projeto
      </Text>
      
      {componentCategories.map((category, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.categoryCard}
          onPress={() => navigation.navigate(category.route)}
        >
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#666',
  },
  categoryCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default ComponentsShowcase;

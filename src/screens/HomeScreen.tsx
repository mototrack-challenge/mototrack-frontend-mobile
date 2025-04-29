import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/Card';
import QuickAccessButton from '../components/QuickAccessButton';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [motosEmManutencao] = useState(5); // Exemplo de quantidade
  const [motosEmAnalise] = useState(3); // Exemplo de quantidade

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const navigateToRegister = () => {
    navigation.navigate('Moto');
  };

  const navigateToList = () => {
    navigation.navigate('ListMotos');
  };

  return (
    <View style={styles.header}>
      <Header title="Página Inicial" onLogout={handleLogout} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.cardsContainer}>
            <Card title="Motos Cadastradas" count={125} backgroundColor="#455A64" />
            <Card title="Motos em Análise" count={20} backgroundColor="#8D6E63" />
            <Card title="Motos em Manutenção" count={60} backgroundColor="#6D4C41" />
            <Card title="Motos prontas para Uso" count={45} backgroundColor="#547A6E" />
          </View>

          <View>
            <QuickAccessButton
              title="Cadastrar Moto"
              onPress={navigateToRegister}
              icon={<Ionicons name="add-circle-outline" size={24} color="white" />}
            />

            <QuickAccessButton
              title="Ver Lista de Motos"
              onPress={navigateToList}
              icon={<Ionicons name="list-outline" size={24} color="white" />}
            />
          </View>
        </ScrollView>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
  },
  content: {
    justifyContent: 'center',
  },
  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }
});

export default HomeScreen;
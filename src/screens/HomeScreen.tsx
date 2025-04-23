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
  const [motosEmAnalise] = useState(3);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

    // Funções para navegação para outras telas (cadastro de motos, lista de motos, etc.)
    const navigateToRegister = () => {
      // Navegação para a tela de cadastro de motos
      console.log('Navegar para Cadastro');
    };
  
    const navigateToList = () => {
      // Navegação para a tela de lista de motos
      console.log('Navegar para Lista de Motos');
    };

  return (
    <View style={styles.header}>
      <Header title="Página Inicial" onLogout={handleLogout} />
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardsContainer}>
          <Card title="Motos em Manutenção" count={motosEmManutencao} backgroundColor="#FF5722" />
          <Card title="Motos em Análise" count={motosEmAnalise} backgroundColor="#A5BFCC" />
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
    flexGrow: 1,
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
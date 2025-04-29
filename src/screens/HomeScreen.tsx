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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [totalMotos, setTotalMotos] = useState(0);
  const [emAnalise, setEmAnalise] = useState(0);
  const [emManutencao, setEmManutencao] = useState(0);
  const [prontas, setProntas] = useState(0);

  const navigateToRegister = () => {
    navigation.navigate('Moto');
  };

  const navigateToList = () => {
    navigation.navigate('ListMotos');
  };

  useEffect(() => {
    const loadMotos = async () => {
      const stored = await AsyncStorage.getItem('motos');
      if (stored) {
        const motos = JSON.parse(stored);
  
        setTotalMotos(motos.length);
  
        const analise = motos.filter((moto: any) => moto.departamento === 'AVALIAÇÃO').length;
        const manutencao = motos.filter((moto: any) => moto.departamento === 'MANUTENÇÃO').length;
        const prontas = motos.filter((moto: any) => moto.departamento === 'PRONTA PARA USO').length;
  
        setEmAnalise(analise);
        setEmManutencao(manutencao);
        setProntas(prontas);
      }
    };
  
    const unsubscribe = navigation.addListener('focus', loadMotos); // Recarrega sempre que voltar pra Home
  
    loadMotos();
  
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.header}>
      <Header title="Página Inicial"/>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.cardsContainer}>
            <Card title="Motos Cadastradas" count={totalMotos} backgroundColor="#455A64" />
            <Card title="Motos em Avaliação" count={emAnalise} backgroundColor="#8D6E63" />
            <Card title="Motos em Manutenção" count={emManutencao} backgroundColor="#6D4C41" />
            <Card title="Motos prontas para Uso" count={prontas} backgroundColor="#547A6E" />
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
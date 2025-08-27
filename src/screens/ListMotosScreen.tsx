import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { useFonts } from 'expo-font';
import QuickAccessButton from '../components/QuickAccessButton';
import { RootStackParamList } from '../types/navigation';
import { ScrollView } from 'react-native-gesture-handler';
import CardMoto from '../components/CardMoto';
import { buscarMotos } from '../services/motoService';
import { Moto, Movimentacao } from '../types/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ListMotosScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    const carregarMotos = async () => {
      try {
        const todasMotos = await buscarMotos();

        setMotos(todasMotos);
      } catch (error) {
        console.error('Erro ao carregar as motos:', error);
      }
    };

    carregarMotos();
  }, []);

  return (
    <View style={styles.header}>
      <Header title="Lista de Motos" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>

          <View>
            {motos.length === 0 ? (
              <Text style={styles.semMotos}>Nenhuma moto cadastrada</Text>
            ) : (
              motos.map((moto) => <CardMoto key={moto.id_moto} moto={moto} />)
            )}
          </View>

          <View>
            <QuickAccessButton
              title="Cadastrar Moto"
              onPress={() => navigation.navigate('RegisterMoto')}
              backgroundColor='#547A6E'
            />

            <QuickAccessButton
              title="Voltar"
              onPress={() => navigation.navigate('Home')}
            />
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  content: {
    justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  semMotos: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
    fontStyle: 'italic'
  },
});
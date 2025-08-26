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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Moto = {
  id_moto: number;
  placa: string;
  chassi: string;
  modelo: string;
  status: string;
  movimentacoes: Movimentacao[];
  alertas: Alerta[];
};

type Movimentacao = {
    departamento_descricao: string;
    data_movimentacao: string;
};

type Alerta = {
    id_alerta: number;
    gravidade: string;
    mensagem: string;
};

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
      <Header title="Lista de Motos"/>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
        
        <View>
          {motos.map((moto) => (
            <CardMoto key={moto.id_moto} moto={moto} />
          ))}
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
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#ECEFF1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  buttons: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 10,
    width: "100%"
  },
  buttonEdit: {
    backgroundColor: '#37474F',
    padding: 10,
    borderRadius: 8,
    width: "60%",
    alignItems: 'center'
  },
  buttonMove: {
    backgroundColor: '#546E7A',
    padding: 10,
    borderRadius: 8,
    width: "60%",
    alignItems: 'center'
  },
  buttonDelete: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
    width: "60%",
    alignItems: 'center'
  },
  btnText: { color: '#fff' },
  button: {
    backgroundColor: '#546E7A',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
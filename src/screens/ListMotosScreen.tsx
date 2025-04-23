import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const STORAGE_KEY = 'motos';

type Movimentacao = {
  departamento: string;
  horario: string;
};

type Moto = {
  id_moto: number;
  placa: string;
  modelo: string;
  status: string;
  departamento: string;
  movimentacoes: Movimentacao[];
};

export default function ListMotosScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [motos, setMotos] = useState<Moto[]>([]);
  const isFocused = useIsFocused();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    const carregarMotos = async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setMotos(JSON.parse(data));
      }
    };

    if (isFocused) carregarMotos();
  }, [isFocused]);

  // Função para deletar uma moto usando alert padrão
  const handleDelete = (id_moto: number) => {
    const confirmed = window.confirm('Tem certeza de que deseja excluir esta moto?');
    if (confirmed) {
      const updatedMotos = motos.filter(moto => moto.id_moto !== id_moto);
      setMotos(updatedMotos);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMotos));
    }
  };

  const renderItem = ({ item }: { item: Moto }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.modelo} - {item.placa}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Departamento atual: {item.departamento}</Text>
      <Text>Movimentações:</Text>
      {item.movimentacoes.map((mov, index) => (
        <Text key={index}>• {mov.departamento} - {mov.horario}</Text>
      ))}

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => navigation.navigate('EditarMoto', { moto: item })}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonMove}
          onPress={() => navigation.navigate('MudarDepartamento', { moto: item })}>
          <Text style={styles.btnText}>Mover Departamento</Text>
        </TouchableOpacity>

        {/* Botão de deletar moto */}
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => handleDelete(item.id_moto)}>
          <Text style={styles.btnText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.header}>
    <Header title="Lista de Motos" onLogout={handleLogout} />
    <View style={styles.container}>
      <FlatList
        data={motos}
        keyExtractor={(item) => item.id_moto.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#f9f9f9',
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
  },
  buttonEdit: { 
    backgroundColor: '#007bff', 
    padding: 10, 
    borderRadius: 8, 
  },
  buttonMove: { 
    backgroundColor: '#28a745', 
    padding: 10, 
    borderRadius: 8, 
  },
  buttonDelete: { 
    backgroundColor: '#dc3545', 
    padding: 10, 
    borderRadius: 8, 
  },
  btnText: { color: '#fff' },
});
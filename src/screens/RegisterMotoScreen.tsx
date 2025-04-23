import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

type Moto = {
  id_moto: number;
  placa: string;
  modelo: string;
  status: string;
  movimentacoes: string[];
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const STORAGE_KEY = 'motos';

const RegisterMotoScreen = () => {
    const navigation = useNavigation<NavigationProp>();

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [status, setStatus] = useState('Em manutenção');
  const [motos, setMotos] = useState<Moto[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  // Carrega motos do AsyncStorage ao iniciar a tela
  useEffect(() => {
    const loadMotos = async () => {
      const storedMotos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedMotos) {
        const parsed = JSON.parse(storedMotos);
        setMotos(parsed);
        if (parsed.length > 0) {
          const lastId = parsed[parsed.length - 1].id_moto;
          setNextId(lastId + 1);
        }
      }
    };
    loadMotos();
  }, []);

  const handleRegister = async () => {
    if (!placa || !modelo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novaMoto: Moto = {
      id_moto: nextId,
      placa,
      modelo,
      status,
      movimentacoes: [],
    };

    const updatedMotos = [...motos, novaMoto];
    setMotos(updatedMotos);
    setNextId(nextId + 1);
    setPlaca('');
    setModelo('');
    setStatus('Em manutenção');

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMotos));
    alert('Moto cadastrada com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Cadastrar Motos" onLogout={handleLogout} />
      <Text style={styles.title}>Preecha todos os dados</Text>

      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
      />

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Em manutenção" value="Em manutenção" />
        <Picker.Item label="Em avaliação" value="Em avaliação" />
        <Picker.Item label="Pronta para uso" value="Pronta para uso" />
      </Picker>

      <View style={styles.button}>
        <Button title="Cadastrar Moto" onPress={handleRegister} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default RegisterMotoScreen;
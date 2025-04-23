import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useFonts } from 'expo-font';

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

      const [fontsLoaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
      });

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [status, setStatus] = useState('Em manutenção');
  const [motos, setMotos] = useState<Moto[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
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
    <View style={styles.header}>
    <Header title="Cadastrar Motos" onLogout={handleLogout} />
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>Preecha todos os dados</Text>

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
      />

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />

      <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={[styles.picker, { fontFamily: 'MontserratRegular' }]}
      >
        <Picker.Item label="Em manutenção" value="Em manutenção" />
        <Picker.Item label="Em avaliação" value="Em avaliação" />
        <Picker.Item label="Pronta para uso" value="Pronta para uso" />
      </Picker>

    <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Cadastrar Moto</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
        <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Voltar</Text>
    </TouchableOpacity>

    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#ECEFF1',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    backgroundColor: '#ECEFF1',
    borderColor: 'gray',
    fontWeight: 'normal',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
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

export default RegisterMotoScreen;
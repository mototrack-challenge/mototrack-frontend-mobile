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
  const [status, setStatus] = useState('Em avaliação');
  const [departamento, setDepartamento] = useState('ENTRADA');
  const [motos, setMotos] = useState<Moto[]>([]);
  const [nextId, setNextId] = useState(1);
  const [mensageError, setMensageError] = useState<string>('');
  const [mensageSucess, SetMensageSucess] = useState<string>('');

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

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
      setMensageError('Preencha todos os campos.')
      SetMensageSucess('');
      return;
    }

    const novaMoto: Moto = {
      id_moto: nextId,
      placa,
      modelo,
      status,
      departamento,
      movimentacoes: [{
        departamento,
        horario: new Date().toLocaleString()
      }],
    };

    const updatedMotos = [...motos, novaMoto];
    setMotos(updatedMotos);
    setNextId(nextId + 1);
    setPlaca('');
    setModelo('');
    setStatus('Em manutenção');
    setDepartamento('ENTRADA');

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMotos));
    SetMensageSucess('Moto cadastrada com sucesso!');
    setMensageError('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        <Header title="Cadastrar Motos" />

        <View style={styles.containerMain}>
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

        <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Departamento</Text>
        <View style={styles.optionContainer}>
          {['ENTRADA', 'AVALIAÇÃO', 'MANUTENÇÃO', 'PRONTA PARA USO', 'SAÍDA'].map((dep) => (
            <TouchableOpacity
              key={dep}
              style={[styles.optionButton, departamento === dep && styles.optionButtonSelected]}
              onPress={() => setDepartamento(dep)}
            >
              <Text style={[styles.optionText, { fontFamily: 'MontserratRegular' }]}>{dep}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Status</Text>
        <View style={styles.optionContainer}>
          {['Em avaliação', 'Em manutenção', 'Pronta para uso'].map((st) => (
            <TouchableOpacity
              key={st}
              style={[styles.optionButton, status === st && styles.optionButtonSelected]}
              onPress={() => setStatus(st)}
            >
              <Text style={[styles.optionText, { fontFamily: 'MontserratRegular' }]}>{st}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {mensageSucess ? <Text style={[styles.success, { fontFamily: 'MontserratRegular' }]}>{mensageSucess}</Text> : null}
        {mensageError ? <Text style={[styles.error, { fontFamily: 'MontserratRegular' }]}>{mensageError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Cadastrar Moto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
          <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Voltar</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  containerMain: {
    paddingTop: 20,
    paddingHorizontal: 10
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
  success: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#CFD8DC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 8,
    marginRight: 8,
  },
  optionButtonSelected: {
    backgroundColor: '#607D8B',
  },
  optionText: {
    color: '#FFF',
    fontSize: 14,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingBottom: 32
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default RegisterMotoScreen;
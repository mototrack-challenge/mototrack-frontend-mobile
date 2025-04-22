import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Preencha todos os campos!');
      return;
    }
  
    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
  
      // Verifica se o e-mail já foi cadastrado
      const emailExists = users.some((user: any) => user.email === email);
      if (emailExists) {
        setError('Este e-mail já está cadastrado.');
        return;
      }
  
      const newUser = { name, email, password };
      const updatedUsers = [...users, newUser];
  
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
  
      setTimeout(() => {
        alert('Cadastro realizado!');
        navigation.navigate('Login');
      }, 100);
    } catch (e) {
      console.error('Erro ao salvar no AsyncStorage', e);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Cadastrar" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>
            Já possui uma conta? Faça login
        </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkText: {
    marginTop: 16,
    color: '#007bff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
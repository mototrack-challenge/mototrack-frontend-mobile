import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mensagem, SetMensagem] = useState<string>('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos!');
      return;
    }
  
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (!storedUsers) {
        setError('Usuário não encontrado. Faça o cadastro primeiro.');
        return;
      }
  
      const parsedUsers = JSON.parse(storedUsers);
  
      // Procurando o usuário com o e-mail e senha fornecidos
      const foundUser = parsedUsers.find(
        (user: any) => user.email === email && user.password === password
      );
  
      if (foundUser) {
        // Login bem-sucedido
        SetMensagem('Login realizado!');
        setError('');
        // navigation.navigate('Dashboard');
      } else {
        setError('E-mail ou senha incorretos.');
      }
    } catch (e) {
      console.error('Erro ao acessar o AsyncStorage', e);
      Alert.alert('Erro', 'Não foi possível realizar o login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      {mensagem? <Text style={styles.success}>{mensagem}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Entrar" onPress={handleLogin} />

      
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>
            Não possui uma conta? Cadastre-se
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
  success: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
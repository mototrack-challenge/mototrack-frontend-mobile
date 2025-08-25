import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { buscarUsuarios, cadastrarUsuario } from '../services/usuarioService';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  const navigation = useNavigation<NavigationProp>();

  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mensagem, SetMensagem] = useState<string>('');

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      setError('Preencha todos os campos!');
      return;
    }

    try {
      const usuariosExistentes = await buscarUsuarios();

      const emailExiste = usuariosExistentes.some(
        (u: any) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExiste) {
        setError('Este e-mail já está cadastrado!');
        return;
      }

      if (senha.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        return;
      }

      await cadastrarUsuario({ nome, email, senha });

      setError('');
      SetMensagem('Cadastro realizado com sucesso!');

      setTimeout(() => {
        SetMensagem('');
        navigation.navigate('Login');
      }, 2000);

    } catch (e) {
      console.error('Erro no cadastro:', error);
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-sem-fundo.png')}
        style={styles.logo}
      />
      <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>Bem-vindo à MotoTrack</Text>
      <Text style={[styles.subtitle, { fontFamily: 'MontserratRegular' }]}>Cadastre-se para acessar o dashboard</Text>

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
      />

      {mensagem ? <Text style={[styles.success, { fontFamily: 'MontserratRegular' }]}>{mensagem}</Text> : null}
      {error ? <Text style={[styles.error, { fontFamily: 'MontserratRegular' }]}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
        <Text style={[styles.linkText, { fontFamily: 'MontserratRegular' }]}>
          Já possui uma conta?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textLink}>Faça login</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#78909C',
    fontWeight: 'normal',
    marginBottom: 24,
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
  button: {
    backgroundColor: '#546E7A',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkText: {
    marginTop: 16,
    color: '#000000',
    textAlign: 'center',
  },
  textLink: {
    marginTop: 16,
    color: '#546E7A',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  success: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RegisterScreen;
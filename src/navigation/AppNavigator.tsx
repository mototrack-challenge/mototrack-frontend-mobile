import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Screens
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import PaginaInicial from '../screens/PaginaInicial';
import ListaDeMotos from '../screens/ListaDeMotos';
import CadastroDeMoto from '../screens/CadastroDeMoto';
import EditarMoto from '../screens/EditarMoto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Movimentacoes from '../screens/Movimentacoes';
import CadastroDeMovimentacao from '../screens/CadastroDeMovimentacao';
import Alertas from '../screens/Alertas';
import CadastroDeAlerta from '../screens/CadastroDeAlerta';
import Colaboradores from '../screens/Colaboradores';
import CadastroDeColaborador from '../screens/CadastroDeColaborador';
import EditarColaborador from '../screens/EditarColaborador';
import Servicos from '../screens/Servicos';
import CadastroDeServico from '../screens/CadastroDeServico';
import EditarServico from '../screens/EditarServico';

import { isTokenValid } from '../services/usuarioService';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {

  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const valid = await isTokenValid();
      if (valid) {
        setInitialRoute("PaginaInicial");
      } else {
        setInitialRoute("Login");
      }
    };
    checkAuth();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="PaginaInicial" component={PaginaInicial} />
        <Stack.Screen name="ListaDeMotos" component={ListaDeMotos} />
        <Stack.Screen name="CadastroDeMoto" component={CadastroDeMoto} />
        <Stack.Screen name="EditarMoto" component={EditarMoto} />
        <Stack.Screen name="Movimentacoes" component={Movimentacoes} />
        <Stack.Screen name="CadastroDeMovimentacao" component={CadastroDeMovimentacao} />
        <Stack.Screen name="Alertas" component={Alertas} />
        <Stack.Screen name="CadastroDeAlerta" component={CadastroDeAlerta} />
        <Stack.Screen name="Colaboradores" component={Colaboradores} />
        <Stack.Screen name="CadastroDeColaborador" component={CadastroDeColaborador} />
        <Stack.Screen name="EditarColaborador" component={EditarColaborador} />
        <Stack.Screen name="Servicos" component={Servicos} />
        <Stack.Screen name="CadastroDeServico" component={CadastroDeServico} />
        <Stack.Screen name="EditarServico" component={EditarServico} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
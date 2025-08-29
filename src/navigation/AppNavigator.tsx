import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Screens
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import PaginaInicial from '../screens/PaginaInicialScreen';
import ListaDeMotos from '../screens/ListaDeMotos';
import EditMotoScreen from '../screens/EditMotoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovimentacoesScreen from '../screens/MovimentacoesScreen';
import RegisterMovimentacaoScreen from '../screens/RegisterMovimentacaoScreen';
import AlertasScreen from '../screens/AlertasScreen';
import RegisterAlertaScreen from '../screens/RegisterAlertaScreen';
import CadastroDeMoto from '../screens/CadastroDeMoto';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {

  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  
  useEffect(() => {
    const checkLogin = async () => {
      const usuarioId = await AsyncStorage.getItem('LoggedUser');
      if (usuarioId) {
        setInitialRoute('PaginaInicial');
      } else {
        setInitialRoute('Login');
      }
    };
    checkLogin();
  }, []);

  if (!initialRoute) {
    return null;
  }

//   if (loading) {
//     return null; // Ou um componente de loading
//   }

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
        <Stack.Screen name="EditMoto" component={EditMotoScreen} />
        <Stack.Screen name="Movimentacoes" component={MovimentacoesScreen} />
        <Stack.Screen name="RegisterMovimentacao" component={RegisterMovimentacaoScreen} />
        <Stack.Screen name="Alertas" component={AlertasScreen} />
        <Stack.Screen name="RegisterAlerta" component={RegisterAlertaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
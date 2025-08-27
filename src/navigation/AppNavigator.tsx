import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ListMotosScreen from '../screens/ListMotosScreen';
import RegisterMotoScreen from '../screens/RegisterMotoScreen';
import EditMotoScreen from '../screens/EditMotoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovimentacoesScreen from '../screens/MovimentacoesScreen';
import RegisterMovimentacaoScreen from '../screens/RegisterMovimentacaoScreen';
import AlertasScreen from '../screens/AlertasScreen';
import RegisterAlertaScreen from '../screens/RegisterAlertaScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {

  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  
  useEffect(() => {
    const checkLogin = async () => {
      const usuarioId = await AsyncStorage.getItem('LoggedUser');
      if (usuarioId) {
        setInitialRoute('Home');
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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ListMotos" component={ListMotosScreen} />
        <Stack.Screen name="RegisterMoto" component={RegisterMotoScreen} />
        <Stack.Screen name="EditMoto" component={EditMotoScreen} />
        <Stack.Screen name="Movimentacoes" component={MovimentacoesScreen} />
        <Stack.Screen name="RegisterMovimentacao" component={RegisterMovimentacaoScreen} />
        <Stack.Screen name="Alertas" component={AlertasScreen} />
        <Stack.Screen name="RegisterAlerta" component={RegisterAlertaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
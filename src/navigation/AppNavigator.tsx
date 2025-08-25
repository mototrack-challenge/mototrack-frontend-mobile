import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ListMotosScreen from '../screens/ListMotosScreen';
import RegisterMotoScreen from '../screens/RegisterMotoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {

//   if (loading) {
//     return null; // Ou um componente de loading
//   }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ListMotos" component={ListMotosScreen} />
        <Stack.Screen name="RegisterMoto" component={RegisterMotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
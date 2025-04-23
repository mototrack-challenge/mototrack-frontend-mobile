import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { RootStackParamList } from './src/types/types';
import HomeScreen from './src/screens/HomeScreen';
import RegisterMotoScreen from './src/screens/RegisterMotoScreen';
import ListMotosScreen from './src/screens/ListMotosScreen';
import EditMotoScreen from './src/screens/EditMotoScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListMotos">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Moto" component={RegisterMotoScreen} />
      <Stack.Screen name="ListMotos" component={ListMotosScreen} />
      <Stack.Screen name="EditMoto" component={EditMotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
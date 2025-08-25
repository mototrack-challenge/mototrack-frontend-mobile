import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import theme from './src/styles/theme';
import { AppNavigator } from './src/navigation/AppNavigator';

const Stack = createStackNavigator();

function App() {
  return (
    <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={theme.colors.primary} 
        />
        <AppNavigator />
    </ThemeProvider>
  );
}

export default App;
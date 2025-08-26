import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import theme from './src/styles/theme';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

function App() {

  const [fontsLoaded] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });


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
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';

interface QuickAccessButtonProps {
  title: string;
  onPress: () => void;
  icon: JSX.Element; // Pode ser um ícone como um ícone de FontAwesome ou outro
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({ title, onPress, icon }) => {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.text, { fontFamily: 'MontserratRegular' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#546E7A',
    borderRadius: 8,
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QuickAccessButton;
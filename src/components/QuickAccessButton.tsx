import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import theme from '../styles/theme';

interface QuickAccessButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({ title, onPress, backgroundColor }) => {

  return (
    <TouchableOpacity 
      style={[styles.button, backgroundColor ? { backgroundColor } : {}]}  
      onPress={onPress}
    >
      <Text style={[styles.text, { fontFamily: theme.fonts.regular }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#546E7A',
    borderRadius: 8,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QuickAccessButton;
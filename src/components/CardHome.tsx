import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import theme from '../styles/theme';

interface CardProps {
  title: string;
  count: number;
  backgroundColor: string;
}

const CardHome: React.FC<CardProps> = ({ title, count, backgroundColor }) => {

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={[styles.title, { fontFamily: theme.fonts.bold }]}>{title}</Text>
      <Text style={[styles.count, { fontFamily: theme.fonts.regular }]}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default CardHome;
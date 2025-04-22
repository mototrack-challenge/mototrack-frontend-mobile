import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

interface CardProps {
  title: string;
  count: number;
  backgroundColor: string;
}

const Card: React.FC<CardProps> = ({ title, count, backgroundColor }) => {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>{title}</Text>
      <Text style={[styles.count, { fontFamily: 'MontserratRegular' }]}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
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

export default Card;
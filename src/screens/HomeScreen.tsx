import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';

const HomeScreen = () => {
  const handleLogout = () => {
    // Lógica de logout aqui, como limpar o AsyncStorage e redirecionar para a tela de login
  };

  return (
    <View style={styles.container}>
      <Header title="Página Inicial" userName="João" onLogout={handleLogout} />
      {/* O resto do conteúdo da página inicial */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
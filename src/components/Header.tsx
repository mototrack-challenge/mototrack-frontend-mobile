import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  title: string;
  userName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, userName, onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSection}>
        <Text style={styles.userName}>{`Bem-vindo, ${userName}`}</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40, // Ajuste para o cabeçalho não ficar em cima do status bar
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#546E7A',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default Header;

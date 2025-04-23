import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
    const [fontsLoaded] = useFonts({
      MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
      MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>{title}</Text>
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={onLogout}>
          <Text style={[styles.logoutText, { fontFamily: 'MontserratRegular' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 16,
    backgroundColor: '#546E7A',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  rightSection: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5
  },
  userName: {
    color: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  logoutText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default Header;

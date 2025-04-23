import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import { useFonts } from 'expo-font';

type EditMotoRouteProp = RouteProp<RootStackParamList, 'EditMoto'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EditMotoScreen() {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  const route = useRoute<EditMotoRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { moto } = route.params;

  const [modelo, setModelo] = useState(moto.modelo);
  const [placa, setPlaca] = useState(moto.placa);
  const [status, setStatus] = useState(moto.status);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleSave = async () => {
    try {
      const data = await AsyncStorage.getItem('motos');
      let motos = data ? JSON.parse(data) : [];

      const index = motos.findIndex((m: any) => m.id_moto === moto.id_moto);
      if (index !== -1) {
        motos[index] = {
          ...motos[index],
          modelo,
          placa,
          status,
        };
        await AsyncStorage.setItem('motos', JSON.stringify(motos));
        alert('Moto atualizada com sucesso!');
        navigation.goBack();
      }
    } catch (error) {
      alert('Não foi possível atualizar a moto.');
    }
  };

  return (
    <View style={styles.header}>
      <Header title="Editar Moto" onLogout={handleLogout} />
      <View style={styles.container}>
        <Text style={[styles.label, { fontFamily: 'MontserratRegular' }]}>Modelo:</Text>
        <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

        <Text style={[styles.label, { fontFamily: 'MontserratRegular' }]}>Placa:</Text>
        <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />

        <Text style={[styles.label, { fontFamily: 'MontserratRegular' }]}>Status:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={[styles.picker, { fontFamily: 'MontserratRegular' }]}
        >
          <Picker.Item label="Em manutenção" value="Em manutenção" />
          <Picker.Item label="Em avaliação" value="Em avaliação" />
          <Picker.Item label="Pronta para uso" value="Pronta para uso" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 4 },
  input: {
    height: 40,
    backgroundColor: '#ECEFF1',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    backgroundColor: '#ECEFF1',
    borderColor: 'gray',
    fontWeight: 'normal',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#546E7A',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
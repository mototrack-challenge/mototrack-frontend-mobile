import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

type EditMotoRouteProp = RouteProp<RootStackParamList, 'EditMoto'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EditMotoScreen() {
  const route = useRoute<EditMotoRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { moto } = route.params;

  const [modelo, setModelo] = useState(moto.modelo);
  const [placa, setPlaca] = useState(moto.placa);
  const [status, setStatus] = useState(moto.status);

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
        Alert.alert('Sucesso', 'Moto atualizada com sucesso!');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a moto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modelo:</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

      <Text style={styles.label}>Placa:</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />

      <Text style={styles.label}>Status:</Text>
        <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Em manutenção" value="Em manutenção" />
            <Picker.Item label="Em avaliação" value="Em avaliação" />
            <Picker.Item label="Pronta para uso" value="Pronta para uso" />
        </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
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
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
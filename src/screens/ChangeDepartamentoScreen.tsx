import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

type ChangeRouteProp = RouteProp<RootStackParamList, 'ChangeDepartamento'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ChangeDepartamentoScreen() {
    const route = useRoute<ChangeRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { moto } = route.params;

    const [novoDepartamento, setNovoDepartamento] = useState('');

    const handleSave = async () => {
        const horario = new Date().toLocaleString();

        try {
            const data = await AsyncStorage.getItem('motos');
            let motos = data ? JSON.parse(data) : [];

            const index = motos.findIndex((m: any) => m.id_moto === moto.id_moto);
            if (index !== -1) {
                motos[index].departamento = novoDepartamento;
                motos[index].movimentacoes.push({ departamento: novoDepartamento, horario });

                await AsyncStorage.setItem('motos', JSON.stringify(motos));
                Alert.alert('Sucesso', 'Departamento alterado!');
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao alterar o departamento.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Novo Departamento:</Text>
            <Picker
                selectedValue={novoDepartamento}
                onValueChange={(itemValue) => setNovoDepartamento(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="ENTRADA" value="ENTRADA" />
                <Picker.Item label="AVALIAÇÃO" value="AVALIAÇÃO" />
                <Picker.Item label="MANUTENÇÃO" value="MANUTENÇÃO" />
                <Picker.Item label="PRONTA PARA USO" value="PRONTA PARA USO" />
                <Picker.Item label="SAÍDA" value="SAÍDA" />
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar Alteração</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    label: { fontSize: 16, marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16 },
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
});
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { useFonts } from 'expo-font';
import QuickAccessButton from '../components/QuickAccessButton';
import { RootStackParamList } from '../types/navigation';
import { ScrollView } from 'react-native-gesture-handler';
import CardMoto from '../components/CardMoto';
import { buscarMotos } from '../services/motoService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Moto = {
  id_moto: number;
  placa: string;
  chassi: string;
  modelo: string;
  status: string;
  movimentacoes: Movimentacao[];
  alertas: Alerta[];
};

type Movimentacao = {
    departamento_descricao: string;
    data_movimentacao: string;
};

type Alerta = {
    id_alerta: number;
    gravidade: string;
    mensagem: string;
};

export default function ListMotosScreen() {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });
  const navigation = useNavigation<NavigationProp>();

  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    const carregarMotos = async () => {
      try {
        const todasMotos = await buscarMotos();

        setMotos(todasMotos);
      } catch (error) {
        console.error('Erro ao carregar as motos:', error);
      }
    };

    carregarMotos();
  }, []);

  const handleDelete = (id_moto: number) => {
    // const confirmed = window.confirm('Tem certeza de que deseja excluir esta moto?');
    // if (confirmed) {
    //   const updatedMotos = motos.filter(moto => moto.id_moto !== id_moto);
    //   setMotos(updatedMotos);
    //   AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMotos));
    // }
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza de que deseja excluir esta moto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            const updatedMotos = motos.filter(moto => moto.id_moto !== id_moto);
            setMotos(updatedMotos);
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMotos));
          },
          style: 'destructive'
        },
      ],
      { cancelable: true }
    );
  };

  // const renderItem = ({ item }: { item: Moto }) => (
  //   <View style={styles.card}>
  //     <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>{item.modelo} - {item.placa}</Text>
  //     <Text style={{ fontFamily: 'MontserratRegular' }}>Status: {item.status}</Text>
  //     <Text style={{ fontFamily: 'MontserratRegular' }}>Departamento atual: {item.departamento}</Text>
  //     <Text style={{ fontFamily: 'MontserratRegular' }}>Movimentações:</Text>
  //     {item.movimentacoes.map((mov, index) => (
  //       <Text style={{ fontFamily: 'MontserratRegular' }} key={index}>• {mov.departamento} - {mov.horario}</Text>
  //     ))}

  //     <View style={styles.buttons}>
  //       <TouchableOpacity
  //         style={styles.buttonEdit}
  //         onPress={() => navigation.navigate('EditMoto', { moto: item })}>
  //         <Text style={[styles.btnText, { fontFamily: 'MontserratRegular' }]}>Editar</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         style={styles.buttonMove}
  //         onPress={() => navigation.navigate('ChangeDepartamento', { moto: item })}>
  //         <Text style={[styles.btnText, { fontFamily: 'MontserratRegular' }]}>Mover Departamento</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         style={styles.buttonDelete}
  //         onPress={() => handleDelete(item.id_moto)}>
  //         <Text style={[styles.btnText, { fontFamily: 'MontserratRegular' }]}>Deletar</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

  return (
    <View style={styles.header}>
      <Header title="Lista de Motos"/>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
        
        <View>
          {motos.map((moto) => (
            <CardMoto key={moto.id_moto} moto={moto} />
          ))}
        </View>

        <View>
            <QuickAccessButton
              title="Cadastrar Moto"
              onPress={() => navigation.navigate('RegisterMoto')}
              backgroundColor='#547A6E'
            />

            <QuickAccessButton
              title="Voltar"
              onPress={() => navigation.navigate('Home')}
            />
        </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  content: {
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#ECEFF1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  buttons: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 10,
    width: "100%"
  },
  buttonEdit: {
    backgroundColor: '#37474F',
    padding: 10,
    borderRadius: 8,
    width: "60%",
    alignItems: 'center'
  },
  buttonMove: {
    backgroundColor: '#546E7A',
    padding: 10,
    borderRadius: 8,
    width: "60%",
    alignItems: 'center'
  },
  buttonDelete: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
    width: "60%",
    alignItems: 'center'
  },
  btnText: { color: '#fff' },
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
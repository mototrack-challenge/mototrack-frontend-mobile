import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { useFonts } from 'expo-font';
import { RootStackParamList } from '../types/navigation';
import { buscarMotoPorId, buscarMotos, editarMoto } from '../services/motoService';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import QuickAccessButton from '../components/QuickAccessButton';
import theme from '../styles/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EditMotoRouteProp = RouteProp<RootStackParamList, 'EditMoto'>;

export default function EditMotoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditMotoRouteProp>();
  const { id_moto } = route.params;

  const [placa, setPlaca] = useState<string>('');
  const [chassi, setChassi] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [mensagemErro, setMensagemErro] = useState<string>('');
  const [mensagemSucesso, SetMensagemSucesso] = useState<string>('');
  const [openModelos, setOpenModelos] = useState(false);
  const [itemsModelos, setItemsModelos] = useState([
    { label: 'Mottu-E', value: 'MOTTU_E' },
    { label: 'Mottu-Pop', value: 'MOTTU_POP' },
    { label: 'Mottu-Sport', value: 'MOTTU_SPORT' },
  ]);
  const [openStatus, setOpenStatus] = useState(false);
  const [itemsStatus, setItemsStatus] = useState([
    { label: 'Avaliação', value: 'AVALIACAO' },
    { label: 'Manutenção', value: 'MANUTENCAO' },
    { label: 'Pronta para uso', value: 'PRONTA_PARA_USO' },
  ]);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    const carregarDadosMoto = async () => {
      try {
        const moto = await buscarMotoPorId(id_moto);
        if (moto) {
          setPlaca(moto.placa);
          setChassi(moto.chassi);
          setModelo(moto.modelo);
          setStatus(moto.status);
        }
      } catch (error) {
        console.error('Erro ao carregar a moto:', error);
      }
    };

    carregarDadosMoto();
  }, [id_moto]);

  const handleEditarMoto = async () => {
    if (!placa || !chassi || !modelo || !status) {
      setMensagemErro('Preencha todos os campos.')
      SetMensagemSucesso('');
      return;
    }
    /*
    
    CONSERTAR ERRO DE EDITAR E NAO CONSEGUIR COM A MESMA PLACA
    
    */
    if (placa.length !== 7) {
      setMensagemErro('A placa deve conter exatamente 7 caracteres.');
      SetMensagemSucesso('');
      return;
    }

    if (chassi.length !== 17) {
      setMensagemErro('O chassi deve conter exatamente 17 caracteres.');
      SetMensagemSucesso('');
      return;
    }

    try {
      const motosCadastradas = await buscarMotos();

      const placaCadastrada = motosCadastradas.some(
        (m: any) => m.placa.toUpperCase() === placa.toUpperCase()
      );

      const chassiCadastrado = motosCadastradas.some(
        (m: any) => m.chassi.toUpperCase() === chassi.toUpperCase()
      );

      if (placaCadastrada) {
        setMensagemErro('Esta placa já está cadastrada!');
        return;
      }

      if (chassiCadastrado) {
        setMensagemErro('Este chassi já está cadastrado!');
        return;
      }

      await editarMoto(id_moto, { placa, chassi, modelo, status });

      setMensagemErro('');
      SetMensagemSucesso('Dados editados com sucesso!');

      setTimeout(() => {
        SetMensagemSucesso('');
        navigation.navigate('ListMotos');
      }, 2000);

    } catch (error) {
      console.error('Erro na edição da moto:', error);
      setMensagemErro('Erro ao conectar com o servidor');
    }
  };

  return (
    <View style={styles.header}>
      <Header title="Editar Motos" />

      <View style={styles.containerCadastrarMoto}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.containerMain}>
            <Text style={[styles.title, { fontFamily: theme.fonts.bold }]}>Preecha todos os dados</Text>

            <Text style={[styles.label, { fontFamily: theme.fonts.regular }]}>Placa</Text>
            <TextInput
              style={[styles.input, { fontFamily: theme.fonts.regular }]}
              placeholder="Ex: ABC1234"
              placeholderTextColor="#999"
              value={placa}
              onChangeText={setPlaca}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            <Text style={[styles.label, { fontFamily: theme.fonts.regular }]}>Chassi</Text>
            <TextInput
              style={[styles.input, { fontFamily: theme.fonts.regular }]}
              placeholder="Ex: 9BWZZZ377VT004251"
              placeholderTextColor="#999"
              value={chassi}
              onChangeText={setChassi}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            <View style={{ zIndex: openModelos ? 3000 : 1000 }}>
              <Text style={[styles.label, { fontFamily: theme.fonts.regular }]}>Modelo</Text>
              <DropDownPicker
                open={openModelos}
                value={modelo}
                items={itemsModelos}
                setOpen={setOpenModelos}
                setValue={setModelo}
                setItems={setItemsModelos}
                placeholder="Selecione um modelo"
                style={[styles.input, focusedInput === "modelo" && styles.inputFocused,]}
                dropDownContainerStyle={styles.dropdownContainer}
                onOpen={() => setFocusedInput("modelo")}
                onClose={() => setFocusedInput(null)}
                zIndex={3000}
                zIndexInverse={1000}
                textStyle={{
                  fontFamily: theme.fonts.regular,
                  fontSize: 14,
                  color: '#000'
                }}
                placeholderStyle={{
                  fontFamily: theme.fonts.regular,
                  color: '#999'
                }}
              />
            </View>

            <View style={{ zIndex: openStatus ? 3000 : 1000 }}>
              <Text style={[styles.label, { fontFamily: theme.fonts.regular }]}>Status</Text>
              <DropDownPicker
                open={openStatus}
                value={status}
                items={itemsStatus}
                setOpen={setOpenStatus}
                setValue={setStatus}
                setItems={setItemsStatus}
                placeholder="Selecione um status"
                style={[styles.input, focusedInput === "status" && styles.inputFocused,]}

                zIndex={2000}
                zIndexInverse={1000}
                textStyle={{
                  fontFamily: theme.fonts.regular,
                  fontSize: 14,
                  color: '#000'
                }}
                placeholderStyle={{
                  fontFamily: theme.fonts.regular,
                  color: '#999'
                }}
              />
            </View>

            {mensagemSucesso ? <Text style={[styles.success, { fontFamily: theme.fonts.regular }]}>{mensagemSucesso}</Text> : null}
            {mensagemErro ? <Text style={[styles.error, { fontFamily: theme.fonts.regular }]}>{mensagemErro}</Text> : null}

            <View>
              <QuickAccessButton
                title="Editar Moto"
                onPress={handleEditarMoto}
                backgroundColor='#547A6E'
              />

              <QuickAccessButton
                title="Voltar"
                onPress={() => navigation.navigate('ListMotos')}
              />
            </View>
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
  containerCadastrarMoto: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingBottom: 32
  },
  containerMain: {
    paddingTop: 20
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: '#FAFAFA',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputFocused: {
    borderColor: 'black',
  },
  dropdownContainer: {
    backgroundColor: '#FAFAFA',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  success: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
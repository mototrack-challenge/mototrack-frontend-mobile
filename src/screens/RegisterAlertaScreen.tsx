import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { RootStackParamList } from "../types/navigation";
import DropDownPicker from "react-native-dropdown-picker";
import QuickAccessButton from "../components/QuickAccessButton";
import theme from "../styles/theme";
import { cadastrarAlerta } from "../services/alertaService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RegisterAlertaRouteProp = RouteProp<RootStackParamList,"RegisterMovimentacao">;

const RegisterAlertaScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RegisterAlertaRouteProp>();
  const { id_moto } = route.params;

  const [gravidade, setGravidade] = useState<string>("");
  const [mensagemAlerta, setMensagemAlerta] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [mensagemSucesso, SetMensagemSucesso] = useState<string>("");
  const [openGravidade, setOpenGravidade] = useState(false);
  const [itensGravidade, setItensGravidade] = useState([
    { label: "Alta", value: "ALTA" },
    { label: "Média", value: "MEDIA" },
    { label: "Baixa", value: "BAIXA" },
  ]);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleCadastrarAlerta = async () => {
    if (!gravidade || !mensagemAlerta) {
      setMensagemErro("Preencha todos os campos!");
      return;
    }

    try {
      await cadastrarAlerta({
        gravidade: gravidade,
        mensagem: mensagemAlerta,
        moto_id: id_moto
      });

      setMensagemErro("");
      SetMensagemSucesso("Alerta cadastrado com sucesso!");

      setTimeout(() => {
        SetMensagemSucesso("");
        navigation.navigate("Alertas", { id_moto: id_moto });
      }, 2000);
    } catch (error) {
      console.error("Erro no cadastro do alerta:", error);
      setMensagemErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <View style={styles.header}>
      <Header title="Cadastrar Alerta" />

      <View style={styles.containerCadastrarMoto}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.containerMain}>
            <Text style={[styles.title, { fontFamily: theme.fonts.bold }]}>
              Preecha todos os dados
            </Text>

            <View style={{ zIndex: openGravidade ? 3000 : 1000 }}>
              <Text style={[styles.label, { fontFamily: theme.fonts.regular }]}>
                Gravidade
              </Text>
              <DropDownPicker
                open={openGravidade}
                value={gravidade}
                items={itensGravidade}
                setOpen={setOpenGravidade}
                setValue={setGravidade}
                setItems={setItensGravidade}
                placeholder="Selecione uma Gravidade do Alerta"
                style={[
                  styles.input,
                  focusedInput === "modelo" && styles.inputFocused,
                ]}
                dropDownContainerStyle={styles.dropdownContainer}
                onOpen={() => setFocusedInput("modelo")}
                onClose={() => setFocusedInput(null)}
                zIndex={3000}
                zIndexInverse={1000}
                textStyle={{
                  fontFamily: theme.fonts.regular,
                  fontSize: 14,
                  color: "#000",
                }}
                placeholderStyle={{
                  fontFamily: theme.fonts.regular,
                  color: "#999",
                }}
              />
            </View>

            <Text style={[styles.label, { fontFamily: theme.fonts.regular }]}>
              Mensagem
            </Text>
            <TextInput
              style={[styles.input, { fontFamily: theme.fonts.regular }]}
              placeholder="Ex: Fazer a manutenção nas luzes da moto"
              placeholderTextColor="#999"
              value={mensagemAlerta}
              onChangeText={setMensagemAlerta}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            {mensagemSucesso ? (
              <Text
                style={[styles.success, { fontFamily: theme.fonts.regular }]}
              >
                {mensagemSucesso}
              </Text>
            ) : null}
            {mensagemErro ? (
              <Text style={[styles.error, { fontFamily: theme.fonts.regular }]}>
                {mensagemErro}
              </Text>
            ) : null}

            <View>
              <QuickAccessButton
                title="Cadastrar Alerta"
                onPress={handleCadastrarAlerta}
                backgroundColor="#547A6E"
              />

              <QuickAccessButton
                title="Voltar"
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  containerCadastrarMoto: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    paddingBottom: 32,
  },
  containerMain: {
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "left",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: "#FAFAFA",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputFocused: {
    borderColor: "black",
  },
  dropdownContainer: {
    backgroundColor: "#FAFAFA",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  success: {
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default RegisterAlertaScreen;

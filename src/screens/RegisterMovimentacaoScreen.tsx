import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../styles/theme";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import QuickAccessButton from "../components/QuickAccessButton";
import { buscarDepartamentos } from "../services/departamentoService";
import { cadastrarMovimentacao } from "../services/movimentacaoService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RegisterMovimentacaoRouteProp = RouteProp<
  RootStackParamList,
  "RegisterMovimentacao"
>;

type Departamento = {
  id_departamento: number;
  descricao: string;
};

const RegisterMovimentacaoScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RegisterMovimentacaoRouteProp>();
  const { id_moto } = route.params;

  const [departamento, setDepartamento] = useState<number | null>(null);
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [mensagemSucesso, SetMensagemSucesso] = useState<string>("");
  const [openDepartamento, setOpenDepartamento] = useState(false);
  const [itemsDepartamentos, setItemsDepartamentos] = useState<
    { label: string; value: number }[]
  >([]);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    const buscarDepartamentosCadastrados = async () => {
      try {
        const departamentosCadastrados = await buscarDepartamentos();
        const itensFormatados = departamentosCadastrados.map(
          (dep: Departamento) => ({
            label: dep.descricao,
            value: dep.id_departamento,
          })
        );

        setItemsDepartamentos(itensFormatados);
      } catch (error) {
        console.error("Erro ao carregar os departamentos:", error);
      }
    };

    buscarDepartamentosCadastrados();
  }, []);

  const handleCadastrarMovimentacao = async () => {
    if (!departamento) {
      setMensagemErro("Preencha todos os campos!");
      return;
    }

    try {
      await cadastrarMovimentacao({
        moto_id: id_moto,
        departamento_id: departamento,
      });

      setMensagemErro("");
      SetMensagemSucesso("Movimentação cadastrada com sucesso!");

      setTimeout(() => {
        SetMensagemSucesso("");
        navigation.navigate("Movimentacoes", { id_moto: id_moto })
      }, 2000);
    } catch (error) {
      console.error("Erro no cadastro da movimentação:", error);
      setMensagemErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <View style={styles.header}>
      <Header title="Cadastrar Movimentação" />

      <View style={styles.containerCadastrarMoto}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.containerMain}>
            <Text style={[styles.title, { fontFamily: theme.fonts.bold }]}>
              Preecha todos os dados
            </Text>

            <Text style={[styles.label, { fontFamily: theme.fonts.regular }]}>
              Departamento
            </Text>
            <DropDownPicker
              open={openDepartamento}
              value={departamento}
              items={itemsDepartamentos}
              setOpen={setOpenDepartamento}
              setValue={setDepartamento}
              setItems={setItemsDepartamentos}
              placeholder="Selecione um departamento"
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
                title="Cadastrar Movimentação"
                onPress={handleCadastrarMovimentacao}
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

export default RegisterMovimentacaoScreen;

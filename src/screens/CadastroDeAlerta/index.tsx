import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { cadastrarAlerta } from "../../services/alertaService";
import { Botoes, Container, ContainerCadastroDaAlerta, ContainerDropDown, ContainerPaginaCadastroDeAlertas, DropDownInputStyle, Input, Label, MensagemErro, MensagemSucesso, ScrollPaginaCadastroDeAlertas, TituloCadastroDaAlerta } from "./styles";
import Cabecalho from "../../components/Cabecalho";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../../styles/theme";
import Botao from "../../components/Botao";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RegisterAlertaRouteProp = RouteProp<
  RootStackParamList,
  "CadastroDeAlerta"
>;

const CadastroDeAlerta = () => {
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

  const handleCadastrarAlerta = async () => {
    if (!gravidade || !mensagemAlerta) {
      setMensagemErro("Preencha todos os campos!");
      return;
    }

    try {
      await cadastrarAlerta({
        gravidade: gravidade,
        mensagem: mensagemAlerta,
        moto_id: id_moto,
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
    <Container>
      <Cabecalho titulo="Cadastrar Alerta" />

      <ContainerPaginaCadastroDeAlertas>
        <ScrollPaginaCadastroDeAlertas>
          <ContainerCadastroDaAlerta>
            <TituloCadastroDaAlerta>
              Preecha todos os dados
            </TituloCadastroDaAlerta>

            <ContainerDropDown zIndexValue={openGravidade ? 3000 : 1000}>
              <Label>Gravidade</Label>
              <DropDownPicker
                open={openGravidade}
                value={gravidade}
                items={itensGravidade}
                setOpen={setOpenGravidade}
                setValue={setGravidade}
                setItems={setItensGravidade}
                placeholder="Selecione uma Gravidade do Alerta"
                style={DropDownInputStyle}
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
            </ContainerDropDown>

            <Label>Mensagem</Label>
            <Input
              placeholder="Ex: Fazer a manutenção nas luzes da moto"
              placeholderTextColor="#999"
              value={mensagemAlerta}
              onChangeText={setMensagemAlerta}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            {mensagemSucesso ? (<MensagemSucesso>{mensagemSucesso}</MensagemSucesso>) : null}
            {mensagemErro ? <MensagemErro>{mensagemErro}</MensagemErro> : null}

            <Botoes>
              <Botao
                titulo="Cadastrar Alerta"
                onPress={handleCadastrarAlerta}
                backgroundColor="#547A6E"
              />

              <Botao
                titulo="Voltar"
                onPress={() => navigation.goBack()}
              />
            </Botoes>
          </ContainerCadastroDaAlerta>
        </ScrollPaginaCadastroDeAlertas>
      </ContainerPaginaCadastroDeAlertas>
    </Container>
  );
};

export default CadastroDeAlerta;

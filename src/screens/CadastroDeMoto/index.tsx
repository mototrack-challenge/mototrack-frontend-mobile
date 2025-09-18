import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { buscarMotos, cadastrarMoto } from "../../services/motoService";
import {
  Botoes,
  Container,
  ContainerCadastroDaMoto,
  ContainerDropDown,
  ContainerPaginaCadastroDeMotos,
  DropDownInputStyle,
  Input,
  Label,
  MensagemErro,
  MensagemSucesso,
  ScrollPaginaCadastroDeMotos,
  TituloCadastroDaMoto,
} from "./styles";
import Cabecalho from "../../components/Cabecalho";
import DropDownPicker from "react-native-dropdown-picker";
import Botao from "../../components/Botao";
import theme from "../../styles/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CadastroDeMoto = () => {
  const navigation = useNavigation<NavigationProp>();
  const [placa, setPlaca] = useState<string>("");
  const [chassi, setChassi] = useState<string>("");
  const [modelo, setModelo] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [mensagemSucesso, SetMensagemSucesso] = useState<string>("");
  const [openModelos, setOpenModelos] = useState(false);
  const [itemsModelos, setItemsModelos] = useState([
    { label: "Mottu-E", value: "MOTTU_E" },
    { label: "Mottu-Pop", value: "MOTTU_POP" },
    { label: "Mottu-Sport", value: "MOTTU_SPORT" },
  ]);
  const [openStatus, setOpenStatus] = useState(false);
  const [itemsStatus, setItemsStatus] = useState([
    { label: "Avaliação", value: "AVALIACAO" },
    { label: "Manutenção", value: "MANUTENCAO" },
    { label: "Disponível", value: "DISPONIVEL" },
  ]);

  const handleCadastrarMoto = async () => {
    if (!placa || !chassi || !modelo || !status) {
      setMensagemErro("Preencha todos os campos.");
      SetMensagemSucesso("");
      return;
    }

    if (placa.length !== 7) {
      setMensagemErro("A placa deve conter exatamente 7 caracteres.");
      SetMensagemSucesso("");
      return;
    }

    if (chassi.length !== 17) {
      setMensagemErro("O chassi deve conter exatamente 17 caracteres.");
      SetMensagemSucesso("");
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
        setMensagemErro("Esta placa já está cadastrada!");
        return;
      }

      if (chassiCadastrado) {
        setMensagemErro("Este chassi já está cadastrado!");
        return;
      }

      await cadastrarMoto({ placa, chassi, modelo, status });

      setMensagemErro("");
      SetMensagemSucesso("Moto cadastrada com sucesso!");

      setTimeout(() => {
        SetMensagemSucesso("");
        navigation.navigate("ListaDeMotos");
      }, 2000);
    } catch (error) {
      console.error("Erro no cadastro da moto:", error);
      setMensagemErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <Container>
      <Cabecalho titulo="Cadastrar Moto" />

      <ContainerPaginaCadastroDeMotos>
        <ScrollPaginaCadastroDeMotos>
          <ContainerCadastroDaMoto>
            <TituloCadastroDaMoto>Preecha todos os dados</TituloCadastroDaMoto>

            <Label>Placa</Label>
            <Input
              placeholder="Ex: ABC1234"
              placeholderTextColor="#999"
              value={placa}
              onChangeText={setPlaca}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            <Label>Chassi</Label>
            <Input
              placeholder="Ex: 9BWZZZ377VT004251"
              placeholderTextColor="#999"
              value={chassi}
              onChangeText={setChassi}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            <ContainerDropDown zIndexValue={openModelos ? 3000 : 1000}>
                <Label>Modelo</Label>
                <DropDownPicker
                    open={openModelos}
                    value={modelo}
                    items={itemsModelos}
                    setOpen={setOpenModelos}
                    setValue={setModelo}
                    setItems={setItemsModelos}
                    placeholder="Selecione um modelo"
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

            <ContainerDropDown zIndexValue={openStatus ? 3000 : 1000}>
              <Label>Status</Label>
              <DropDownPicker
                open={openStatus}
                value={status}
                items={itemsStatus}
                setOpen={setOpenStatus}
                setValue={setStatus}
                setItems={setItemsStatus}
                placeholder="Selecione um status"
                style={DropDownInputStyle}
                zIndex={2000}
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

            {mensagemSucesso ? (
              <MensagemSucesso>{mensagemSucesso}</MensagemSucesso>
            ) : null}
            {mensagemErro ? <MensagemErro>{mensagemErro}</MensagemErro> : null}

            <Botoes>
              <Botao
                titulo="Cadastrar Moto"
                onPress={handleCadastrarMoto}
                backgroundColor="#547A6E"
              />

              <Botao
                titulo="Voltar"
                onPress={() => navigation.navigate("ListaDeMotos")}
              />
            </Botoes>
          </ContainerCadastroDaMoto>
        </ScrollPaginaCadastroDeMotos>
      </ContainerPaginaCadastroDeMotos>
    </Container>
  );
};

export default CadastroDeMoto;

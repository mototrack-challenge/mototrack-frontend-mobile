import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Departamento } from "../../types/types";
import { buscarDepartamentos } from "../../services/departamentoService";
import { cadastrarMovimentacao } from "../../services/movimentacaoService";
import {
    Botoes,
  Container,
  ContainerCadastroDaMovimentacao,
  ContainerDropDown,
  ContainerPaginaCadastroDeMovimentacao,
  DropDownInputStyle,
  Label,
  MensagemErro,
  MensagemSucesso,
  ScrollPaginaCadastroDeMovimentacao,
  TituloCadastroDaMovimentacao,
} from "./styles";
import Cabecalho from "../../components/Cabecalho";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../../styles/theme";
import Botao from "../../components/Botao";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RegisterMovimentacaoRouteProp = RouteProp<
  RootStackParamList,
  "CadastroDeMovimentacao"
>;

const CadastroDeMovimentacao = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RegisterMovimentacaoRouteProp>();
  const { id_moto } = route.params;
  const [departamento, setDepartamento] = useState<number | null>(null);
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [mensagemSucesso, SetMensagemSucesso] = useState<string>("");
  const [openDepartamentos, setOpenDepartamentos] = useState(false);
  const [itemsDepartamentos, setItemsDepartamentos] = useState<
    { label: string; value: number }[]
  >([]);

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
        navigation.navigate("Movimentacoes", { id_moto: id_moto });
      }, 2000);
    } catch (error) {
      console.error("Erro no cadastro da movimentação:", error);
      setMensagemErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <Container>
      <Cabecalho titulo="Cadastrar Movimentação" />

      <ContainerPaginaCadastroDeMovimentacao>
        <ScrollPaginaCadastroDeMovimentacao>
          <ContainerCadastroDaMovimentacao>
            <TituloCadastroDaMovimentacao>
              Preecha todos os dados
            </TituloCadastroDaMovimentacao>

            <ContainerDropDown zIndexValue={openDepartamentos ? 3000 : 1000}>
              <Label>Departamento</Label>
              <DropDownPicker
                open={openDepartamentos}
                value={departamento}
                items={itemsDepartamentos}
                setOpen={setOpenDepartamentos}
                setValue={setDepartamento}
                setItems={setItemsDepartamentos}
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

            {mensagemSucesso ? (<MensagemSucesso>{mensagemSucesso}</MensagemSucesso>) : null}
            {mensagemErro ? <MensagemErro>{mensagemErro}</MensagemErro> : null}

            <Botoes>
              <Botao
                titulo="Cadastrar Movimentação"
                onPress={handleCadastrarMovimentacao}
                backgroundColor="#547A6E"
              />

              <Botao
                titulo="Voltar"
                onPress={() => navigation.goBack()}
              />
            </Botoes>
          </ContainerCadastroDaMovimentacao>
        </ScrollPaginaCadastroDeMovimentacao>
      </ContainerPaginaCadastroDeMovimentacao>
    </Container>
  );
};

export default CadastroDeMovimentacao;

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Botoes,
  Container,
  ContainerCadastroDoColaborador,
  ContainerPaginaCadastroDeColaborador,
  Input,
  Label,
  MensagemErro,
  MensagemSucesso,
  ScrollPaginaCadastroDeColaborador,
  TituloCadastroDoColaborador,
} from "./style";
import Cabecalho from "../../components/Cabecalho";
import Botao from "../../components/Botao";
import {
  buscarColaboradores,
  buscarColaboradorPorId,
  editarColaborador,
} from "../../services/colaboradorService";
import Loading from "../../components/Loading";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EditColaboradorRouteProp = RouteProp<
  RootStackParamList,
  "EditarColaborador"
>;

const EditarColaborador = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditColaboradorRouteProp>();
  const { id_colaborador } = route.params;

  const [nome, setNome] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [mensagemSucesso, SetMensagemSucesso] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const carregarDadosColaborador = async () => {
      try {
        const colaborador = await buscarColaboradorPorId(id_colaborador);
        if (colaborador) {
          setNome(colaborador.nome);
          setMatricula(colaborador.matricula);
          setEmail(colaborador.email);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do colaborador:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosColaborador();
  }, [id_colaborador]);

  const handleEditarColaborador = async () => {
    if (!nome || !matricula || !email) {
      setMensagemErro("Preencha todos os campos.");
      SetMensagemSucesso("");
      return;
    }

    if (matricula.length !== 9) {
      setMensagemErro("A matrícula deve conter exatamente 9 caracteres.");
      SetMensagemSucesso("");
      return;
    }

    try {
      const colaboradoresCadastrados = await buscarColaboradores();

      const matriculaCadastrada = colaboradoresCadastrados.some(
        (c: any) =>
          c.matricula.toUpperCase() === matricula.toUpperCase() &&
          c.id != id_colaborador
      );

      const emailCadastrada = colaboradoresCadastrados.some(
        (c: any) =>
          c.email.toLowerCase() === email.toLowerCase() &&
          c.id != id_colaborador
      );

      if (matriculaCadastrada) {
        setMensagemErro("Esta matriucla já está cadastrada!");
        return;
      }

      if (emailCadastrada) {
        setMensagemErro("Este email já está cadastrado!");
        return;
      }

      await editarColaborador(id_colaborador, { nome, matricula, email });

      setMensagemErro("");
      SetMensagemSucesso("Dados editados com sucesso!");

      setTimeout(() => {
        SetMensagemSucesso("");
        navigation.navigate("Colaboradores");
      }, 2000);
    } catch (error) {
      console.error("Erro na edição do colaborador:", error);
      setMensagemErro("Erro ao conectar com o servidor");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Cabecalho titulo="Editar Colaborador" />

      <ContainerPaginaCadastroDeColaborador>
        <ScrollPaginaCadastroDeColaborador>
          <ContainerCadastroDoColaborador>
            <TituloCadastroDoColaborador>
              Preecha todos os dados
            </TituloCadastroDoColaborador>

            <Label>Nome Completo</Label>
            <Input
              placeholder="Nome do Colaborador"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            <Label>Número da Matrícula</Label>
            <Input
              placeholder="Ex: 620184901"
              placeholderTextColor="#999"
              value={matricula}
              onChangeText={setMatricula}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            <Label>Email</Label>
            <Input
              placeholder="Ex: colaborador@email.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              selectionColor="black"
              underlineColorAndroid="transparent"
            />

            {mensagemSucesso ? (
              <MensagemSucesso>{mensagemSucesso}</MensagemSucesso>
            ) : null}
            {mensagemErro ? <MensagemErro>{mensagemErro}</MensagemErro> : null}

            <Botoes>
              <Botao
                titulo="Editar Colaborador"
                onPress={handleEditarColaborador}
                backgroundColor="#547A6E"
              />

              <Botao
                titulo="Voltar"
                onPress={() => navigation.navigate("Colaboradores")}
              />
            </Botoes>
          </ContainerCadastroDoColaborador>
        </ScrollPaginaCadastroDeColaborador>
      </ContainerPaginaCadastroDeColaborador>
    </Container>
  );
};

export default EditarColaborador;

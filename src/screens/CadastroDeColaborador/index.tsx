import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Botao from "../../components/Botao";
import Cabecalho from "../../components/Cabecalho";
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
import { RootStackParamList } from "../../types/navigation";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  buscarColaboradores,
  cadastrarColaborador,
} from "../../services/colaboradorService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CadastroDeColaborador = () => {
  const navigation = useNavigation<NavigationProp>();
  const [nome, setNome] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [mensagemSucesso, SetMensagemSucesso] = useState<string>("");

  const handleCadastrarColaborador = async () => {
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
        (c: any) => c.matricula.toUpperCase() === matricula.toUpperCase()
      );

      const emailCadastrada = colaboradoresCadastrados.some(
        (c: any) => c.matricula.toLowerCase() === matricula.toLowerCase()
      );

      if (matriculaCadastrada) {
        setMensagemErro("Esta matriucla já está cadastrada!");
        return;
      }

      if (emailCadastrada) {
        setMensagemErro("Este email já está cadastrado!");
        return;
      }

      await cadastrarColaborador({ nome, matricula, email });

      setMensagemErro("");
      SetMensagemSucesso("Colaborador cadastrado com sucesso!");

      setTimeout(() => {
        SetMensagemSucesso("");
        navigation.navigate("Colaboradores");
      }, 2000);
    } catch (error) {
      console.error("Erro no cadastro do colaborador:", error);
      setMensagemErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <Container>
      <Cabecalho titulo="Cadastrar Colaborador" />

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
                titulo="Cadastrar Colaborador"
                onPress={handleCadastrarColaborador}
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

export default CadastroDeColaborador;

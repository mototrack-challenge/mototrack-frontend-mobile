import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { buscarUsuarios, login } from "../../services/usuarioService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BotaoEntrar,
  BotaoLink,
  Container,
  ContainerLink,
  Input,
  Logo,
  MensagemErro,
  MensagemSucesso,
  Subtitulo,
  TextoBotaoEntrar,
  TextoBotaoLink,
  TextoLink,
  Titulo,
} from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [mensagemSucesso, setMensagemSucesso] = useState<string>("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setMensagemErro("Preencha todos os campos!");
      return;
    }

    try {
        await login({ email, senha });

        setMensagemErro('');
        setMensagemSucesso('Login realizado com sucesso!');

        setTimeout(() => {
            navigation.navigate('PaginaInicial');
        }, 2000);

    } catch (e: any) {
        console.error(e);
        setMensagemErro(e.message || 'Erro ao conectar com o servidor');
    }
  };

  return (
    <Container>
      <Logo source={require("../../../assets/images/logo-sem-fundo.png")} />

      <Titulo>Bem-Vindo de volta</Titulo>
      <Subtitulo>Entre com sua conta</Subtitulo>

      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
      />

      {mensagemSucesso ? (
        <MensagemSucesso>{mensagemSucesso}</MensagemSucesso>
      ) : null}
      {mensagemErro ? <MensagemErro>{mensagemErro}</MensagemErro> : null}

      <BotaoEntrar onPress={handleLogin}>
        <TextoBotaoEntrar>Entrar</TextoBotaoEntrar>
      </BotaoEntrar>

      <ContainerLink>
        <TextoLink>Não possui uma conta? </TextoLink>

        <BotaoLink onPress={() => navigation.navigate("Cadastro")}>
          <TextoBotaoLink>Cadastre-se</TextoBotaoLink>
        </BotaoLink>
      </ContainerLink>
    </Container>
  );
};

export default Login;

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { buscarUsuarios, cadastrarUsuario } from "../../services/usuarioService";
import { BotaoCadastrar, BotaoLink, Container, ContainerLink, Input, Logo, MensagemErro, MensagemSucesso, Subtitulo, TextoBotaoCadastrar, TextoBotaoLink, TextoLink, Titulo } from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Cadastro = () => {
    const navigation = useNavigation<NavigationProp>();
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [mensagemErro, setMensagemErro] = useState<string>("");
    const [mensagemSucesso, setMensagemSucesso] = useState<string>("");

    const handleCadastrar = async () => {
        if (!nome || !email || !senha) {
            setMensagemErro("Preencha todos os campos!");
            return;
        }

        try {
            // const usuariosExistentes = await buscarUsuarios();

            // const emailExiste = usuariosExistentes.some(
            // (u: any) => u.email.toLowerCase() === email.toLowerCase()
            // );

            // if (emailExiste) {
            // setMensagemErro("Este e-mail já está cadastrado!");
            // return;
            // }

            // if (senha.length < 6) {
            // setMensagemErro("A senha deve ter pelo menos 6 caracteres");
            // return;
            // }

            await cadastrarUsuario({ nome, email, senha });

            setMensagemErro("");
            setMensagemSucesso("Cadastro realizado com sucesso!");

            setTimeout(() => {
            setMensagemSucesso("");
            navigation.navigate("Login");
            }, 2000);
        } catch (error) {
            console.error("Erro no cadastro:", error);
            setMensagemErro("Erro ao conectar com o servidor");
        }
    };

    return (
        <Container>
            <Logo source={require('../../../assets/images/logo-sem-fundo.png')}/>
            
            <Titulo>Bem-vindo à MotoTrack</Titulo>
            <Subtitulo>Cadastre-se para acessar o dashboard</Subtitulo>

            <Input
                value={nome}
                onChangeText={setNome}
                placeholder="Nome Completo"
                placeholderTextColor="#999"
            />

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

            {mensagemSucesso ? <MensagemSucesso>{mensagemSucesso}</MensagemSucesso> : null}
            {mensagemErro ? <MensagemErro>{mensagemErro}</MensagemErro> : null}
            
            <BotaoCadastrar onPress={handleCadastrar}>
                <TextoBotaoCadastrar>Cadastrar</TextoBotaoCadastrar>
            </BotaoCadastrar>

            <ContainerLink>
                <TextoLink>Já possui uma conta? {' '}</TextoLink>

                <BotaoLink onPress={() => navigation.navigate('Login')}>
                    <TextoBotaoLink>Faça login</TextoBotaoLink>
                </BotaoLink>
            </ContainerLink>
        </Container>
    );
};

export default Cadastro;
import { useEffect, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import { Container, ContainerBotoesPaginaColaboradores, ContainerCardsColaboradores, ContainerPaginaColaboradores, ScrollPaginaColaboradores, TextoNenhumColaboradorCadastrada, TituloColaboradores, TituloConteudoCardColaboradores } from "./styles";
import { Colaborador } from "../../types/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CardColaborador from "./components/CardColaborador";
import { buscarColaboradores } from "../../services/colaboradorService";
import Botao from "../../components/Botao";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Colaboradores = () => {
    const navigation = useNavigation<NavigationProp>();
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

    useEffect(() => {
        const pegarColaboradores = async () => {
            try {
                const colaboradoresCadastrados = await buscarColaboradores();
        
                setColaboradores(colaboradoresCadastrados);
            } catch (error) {
                console.error("Erro ao carregar os colaboradores:", error);
            }
        };

        pegarColaboradores();
    }, []);

    const handleDelete = (idColaborador: number) => {
        console.log(idColaborador);
    };

    return (
        <Container>
            <Cabecalho titulo="Colaboradores" />

            <ContainerPaginaColaboradores>
                <ScrollPaginaColaboradores>
                    <TituloColaboradores>Colaboradores</TituloColaboradores>

                    <ContainerCardsColaboradores>
                        {colaboradores.length === 0 ? (
                            <TextoNenhumColaboradorCadastrada>Nenhum colaborador cadastrado</TextoNenhumColaboradorCadastrada>
                        ) : (
                            colaboradores.map((colaborador) => (
                                <CardColaborador
                                    key={colaborador.id}
                                    colaborador={colaborador}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </ContainerCardsColaboradores>

                    

                </ScrollPaginaColaboradores>

                <ContainerBotoesPaginaColaboradores>
                    <Botao
                        titulo="Cadastrar Colaborador"
                        onPress={() =>
                            navigation.navigate("CadastroDeColaborador")
                        }
                        backgroundColor="#547A6E"
                    />

                    <Botao
                        titulo="Voltar"
                        onPress={() => navigation.navigate("ListaDeMotos")}
                    />
                </ContainerBotoesPaginaColaboradores>
            </ContainerPaginaColaboradores>
        </Container>
    );
};

export default Colaboradores;
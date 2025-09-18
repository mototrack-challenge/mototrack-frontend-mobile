import { useEffect, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import {
  Container,
  ContainerBotoesPaginaColaboradores,
  ContainerCardsColaboradores,
  ContainerPaginaColaboradores,
  ScrollPaginaColaboradores,
  TextoNenhumColaboradorCadastrada,
  TituloColaboradores,
  TituloConteudoCardColaboradores,
} from "./styles";
import { Colaborador } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CardColaborador from "./components/CardColaborador";
import { buscarColaboradores, deletarColaborador } from "../../services/colaboradorService";
import Botao from "../../components/Botao";
import { Alert } from "react-native";
import Loading from "../../components/Loading";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Colaboradores = () => {
  const navigation = useNavigation<NavigationProp>();
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pegarColaboradores = async () => {
      try {
        const colaboradoresCadastrados = await buscarColaboradores();

        setColaboradores(colaboradoresCadastrados ?? []);
      } catch (error) {
        console.error("Erro ao carregar os colaboradores:", error);
        setColaboradores([]);
      } finally {
        setLoading(false);
      }
    };

    pegarColaboradores();
  }, []);

  const handleDelete = (idColaborador: number) => {
    // Alert.alert(
    //   "Confirmar Exclusão",
    //   "Tem certeza que deseja excluir este colaborador?",
    //   [
    //     { text: "Cancelar", style: "cancel" },
    //     {
    //       text: "Excluir",
    //       style: "destructive",
    //       onPress: async () => {
    //         try {
    //           await deletarColaborador(idColaborador);
    //           setColaboradores((prev) =>
    //             prev.filter((c) => c.id !== idColaborador)
    //           );
    //         } catch (error) {
    //           console.error("Erro ao deletar colaborador:", error);
    //         }
    //       },
    //     },
    //   ]
    // );
    const confirmacao = window.confirm("Tem certeza que deseja excluir este colaborador?");
  
    if (confirmacao) {
        deletarColaborador(idColaborador)
        .then(() => {
            setColaboradores((prev) =>
            prev.filter((c) => c.id !== idColaborador)
            );
        })
        .catch((error) => {
            console.error("Erro ao deletar colaborador:", error);
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Cabecalho titulo="Colaboradores" />

      <ContainerPaginaColaboradores>
        <ScrollPaginaColaboradores>
          <TituloColaboradores>Colaboradores</TituloColaboradores>

          <ContainerCardsColaboradores>
            {colaboradores.length === 0 ? (
              <TextoNenhumColaboradorCadastrada>
                Nenhum colaborador cadastrado
              </TextoNenhumColaboradorCadastrada>
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
            onPress={() => navigation.navigate("CadastroDeColaborador")}
            backgroundColor="#547A6E"
          />

          <Botao
            titulo="Voltar"
            onPress={() => navigation.navigate("PaginaInicial")}
          />
        </ContainerBotoesPaginaColaboradores>
      </ContainerPaginaColaboradores>
    </Container>
  );
};

export default Colaboradores;

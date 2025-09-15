import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Movimentacao } from "../../types/types";
import { useEffect, useState } from "react";
import {
  buscarMovimentacoesPorMoto,
  deletarMovimentacao,
} from "../../services/movimentacaoService";
import { Alert } from "react-native";
import {
  Container,
  ContainerBotoesPaginaMovimentacoes,
  ContainerCardsMovimentacoes,
  ContainerPaginaMovimentacoes,
  ScrollPaginaMovimentacoes,
  TextoNenhumaMovimentacaoCadastrada,
  TituloMovimentacoes,
} from "./styles";
import Cabecalho from "../../components/Cabecalho";
import Botao from "../../components/Botao";
import CardMovimentacao from "./components/CardMovimentacao";
import Loading from "../../components/Loading";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MovimentacoesRouteProp = RouteProp<RootStackParamList, "Movimentacoes">;

const Movimentacoes = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<MovimentacoesRouteProp>();
  const { id_moto } = route.params;
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pegarMovimentacoesDaMoto = async () => {
      try {
        const movimentacoesCadastradas = await buscarMovimentacoesPorMoto(
          id_moto
        );

        setMovimentacoes(movimentacoesCadastradas);
      } catch (error) {
        console.error("Erro ao carregar as movimentações:", error);
      } finally {
        setLoading(false);
      }
    };

    pegarMovimentacoesDaMoto();
  }, []);

  const handleDelete = (id_movimentacao: number) => {
    // Alert.alert(
    //   "Confirmar Exclusão",
    //   "Tem certeza que deseja excluir esta movimentação?",
    //   [
    //     { text: "Cancelar", style: "cancel" },
    //     {
    //       text: "Excluir",
    //       style: "destructive",
    //       onPress: async () => {
    //         try {
    //           await deletarMovimentacao(id_movimentacao);
    //           setMovimentacoes((prev) =>
    //             prev.filter((m) => m.id_movimentacao !== id_movimentacao)
    //           );
    //         } catch (error) {
    //           console.error("Erro ao deletar movimentação:", error);
    //         }
    //       },
    //     },
    //   ]
    // );
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir esta movimentação?"
    );

    if (confirmacao) {
      deletarMovimentacao(id_movimentacao)
        .then(() => {
          setMovimentacoes((prev) => prev.filter((c) => c.id_movimentacao !== id_movimentacao));
        })
        .catch((error) => {
          console.error("Erro ao deletar a movimentação:", error);
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Cabecalho titulo="Movimentações" />

      <ContainerPaginaMovimentacoes>
        <ScrollPaginaMovimentacoes>
          <TituloMovimentacoes>Movimentações da moto</TituloMovimentacoes>

          <ContainerCardsMovimentacoes>
            {movimentacoes.length === 0 ? (
              <TextoNenhumaMovimentacaoCadastrada>
                Nenhuma movimentação cadastrada
              </TextoNenhumaMovimentacaoCadastrada>
            ) : (
              movimentacoes.map((movimentacao) => (
                <CardMovimentacao
                  key={movimentacao.id_movimentacao}
                  movimentacao={movimentacao}
                  onDelete={handleDelete}
                />
              ))
            )}
          </ContainerCardsMovimentacoes>
        </ScrollPaginaMovimentacoes>
        <ContainerBotoesPaginaMovimentacoes>
          <Botao
            titulo="Cadastrar Movimentação"
            onPress={() =>
              navigation.navigate("CadastroDeMovimentacao", {
                id_moto: id_moto,
              })
            }
            backgroundColor="#547A6E"
          />

          <Botao
            titulo="Voltar"
            onPress={() => navigation.navigate("ListaDeMotos")}
          />
        </ContainerBotoesPaginaMovimentacoes>
      </ContainerPaginaMovimentacoes>
    </Container>
  );
};

export default Movimentacoes;

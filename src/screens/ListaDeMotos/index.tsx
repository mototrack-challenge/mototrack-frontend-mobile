import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Moto } from "../../types/types";
import { buscarMotos, deletarMoto } from "../../services/motoService";
import { Alert } from "react-native";
import {
  Container,
  ContainerBotoesPaginaListaDeMotos,
  ContainerCardsMotos,
  ContainerPaginaListaDeMotos,
  ScrollPaginaListaDeMotos,
  TextoNenhumaMotoCadastrada,
} from "./styles";
import Cabecalho from "../../components/Cabecalho";
import Botao from "../../components/Botao";
import CardMoto from "./components/CardMoto";
import Loading from "../../components/Loading";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ListaDeMotos = () => {
  const navigation = useNavigation<NavigationProp>();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const carregarMotos = async () => {
      try {
        const todasMotos = await buscarMotos();

        setMotos(todasMotos);
      } catch (error) {
        console.error("Erro ao carregar as motos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarMotos();
  }, []);

  const handleDeletarMoto = async (id_moto: number) => {
    // Alert.alert(
    //   "Confirmar Exclusão",
    //   "Tem certeza que deseja excluir esta moto?",
    //   [
    //     { text: "Cancelar", style: "cancel" },
    //     {
    //       text: "Excluir",
    //       style: "destructive",
    //       onPress: async () => {
    //         try {
    //           await deletarMoto(id_moto);
    //           setMotos((prev) => prev.filter((m) => m.id_moto !== id_moto));
    //         } catch (error) {
    //           console.error("Erro ao deletar moto:", error);
    //         }
    //       },
    //     },
    //   ]
    // );
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir esta moto?"
    );

    if (confirmacao) {
      deletarMoto(id_moto)
        .then(() => {
          setMotos((prev) => prev.filter((c) => c.id_moto !== id_moto));
        })
        .catch((error) => {
          console.error("Erro ao deletar a moto:", error);
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Cabecalho titulo="Motos Cadastradas" />

      <ContainerPaginaListaDeMotos>
        <ScrollPaginaListaDeMotos>
          <ContainerCardsMotos>
            {motos.length === 0 ? (
              <TextoNenhumaMotoCadastrada>
                Nenhuma moto cadastrada
              </TextoNenhumaMotoCadastrada>
            ) : (
              motos.map((moto) => (
                <CardMoto
                  key={moto.id_moto}
                  moto={moto}
                  onDelete={handleDeletarMoto}
                />
              ))
            )}
          </ContainerCardsMotos>
        </ScrollPaginaListaDeMotos>

        <ContainerBotoesPaginaListaDeMotos>
          <Botao
            titulo="Cadastrar Moto"
            onPress={() => navigation.navigate("CadastroDeMoto")}
            backgroundColor="#547A6E"
          />

          <Botao
            titulo="Voltar"
            onPress={() => navigation.navigate("PaginaInicial")}
          />
        </ContainerBotoesPaginaListaDeMotos>
      </ContainerPaginaListaDeMotos>
    </Container>
  );
};

export default ListaDeMotos;

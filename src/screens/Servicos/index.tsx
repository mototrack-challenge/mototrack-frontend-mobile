import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Servico } from "../../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { buscarServicosPorMoto, deletarServico } from "../../services/servicoService";
import { Container, ContainerBotoesPaginaServicos, ContainerCardsServicos, ContainerPaginaServicos, ScrollPaginaServicos, TextoNenhumServicoCadastrado, TituloServicos } from "./styles";
import Cabecalho from "../../components/Cabecalho";
import Botao from "../../components/Botao";
import CardServico from "./components/CardServico";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ServicosRouteProp = RouteProp<RootStackParamList, "Servicos">;

const Servicos = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ServicosRouteProp>();
  const { id_moto } = route.params;
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    const carregarServicosMoto = async () => {
      const servicosMoto = await buscarServicosPorMoto(id_moto);

      setServicos(servicosMoto);
    };

    carregarServicosMoto();
  }, []);

  const handleDelete = (idServico: number) => {
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
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este colaborador?"
    );

    if (confirmacao) {
      deletarServico(idServico)
        .then(() => {
          setServicos((prev) => prev.filter((c) => c.id !== idServico));
        })
        .catch((error) => {
          console.error("Erro ao deletar o serviço:", error);
        });
    }
  };

  return (
    <Container>
      <Cabecalho titulo="Serviços" />

      <ContainerPaginaServicos>
        <ScrollPaginaServicos>
          <TituloServicos>Serviços da moto</TituloServicos>

          <ContainerCardsServicos>
            {servicos.length === 0 ? (
              <TextoNenhumServicoCadastrado>
                Nenhum serviço cadastrado
              </TextoNenhumServicoCadastrado>
            ) : (
              servicos.map((servico) => (
                <CardServico
                  key={servico.id}
                  servico={servico}
                  onDelete={handleDelete}
                />
              ))
            )}
          </ContainerCardsServicos>
        </ScrollPaginaServicos>
        <ContainerBotoesPaginaServicos>
          <Botao
            titulo="Cadastrar Serviço"
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
        </ContainerBotoesPaginaServicos>
      </ContainerPaginaServicos>
    </Container>
  );
};

export default Servicos;

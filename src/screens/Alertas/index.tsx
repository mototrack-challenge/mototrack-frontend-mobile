import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alerta } from "../../types/types";
import {
  buscarAlertasPorMoto,
  deletarAlerta,
} from "../../services/alertaService";
import { Alert } from "react-native";
import {
  Container,
  ContainerBotoesPaginaAlertas,
  ContainerCardsAlertas,
  ContainerPaginaAlertas,
  ScrollPaginaAlertas,
  TextoNenhumaAlertaCadastrado,
  TituloAlertas,
} from "./styles";
import Cabecalho from "../../components/Cabecalho";
import CardAlerta from "./components/CardAlerta";
import Botao from "../../components/Botao";
import Loading from "../../components/Loading";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AlertasRouteProp = RouteProp<RootStackParamList, "Alertas">;

const Alertas = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AlertasRouteProp>();
  const { id_moto } = route.params;
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pegarAlertasDaMoto = async () => {
      try {
        const alertasCadastrados = await buscarAlertasPorMoto(id_moto);

        setAlertas(alertasCadastrados);
      } catch (error) {
        console.error("Erro ao carregar os alertas:", error);
      } finally {
        setLoading(false);
      }
    };

    pegarAlertasDaMoto();
  }, []);

  const handleDelete = (id_alerta: number) => {
    // Alert.alert(
    //   "Confirmar Exclusão",
    //   "Tem certeza que deseja excluir este alerta?",
    //   [
    //     { text: "Cancelar", style: "cancel" },
    //     {
    //       text: "Excluir",
    //       style: "destructive",
    //       onPress: async () => {
    //         try {
    //           await deletarAlerta(id_alerta);
    //           setAlertas((prev) =>
    //             prev.filter((a) => a.id_alerta !== id_alerta)
    //           );
    //         } catch (error) {
    //           console.error("Erro ao deletar alerta:", error);
    //         }
    //       },
    //     },
    //   ]
    // );
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este alerta?"
    );

    if (confirmacao) {
      deletarAlerta(id_alerta)
        .then(() => {
          setAlertas((prev) => prev.filter((c) => c.id_alerta !== id_alerta));
        })
        .catch((error) => {
          console.error("Erro ao deletar a alerta:", error);
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Cabecalho titulo="Alertas" />
      <ContainerPaginaAlertas>
        <ScrollPaginaAlertas>
          <TituloAlertas>Alertas da moto</TituloAlertas>

          <ContainerCardsAlertas>
            {alertas.length === 0 ? (
              <TextoNenhumaAlertaCadastrado>
                Nenhum alerta encontrado
              </TextoNenhumaAlertaCadastrado>
            ) : (
              alertas.map((alerta) => (
                <CardAlerta
                  key={alerta.id_alerta}
                  alerta={alerta}
                  onDelete={handleDelete}
                />
              ))
            )}
          </ContainerCardsAlertas>
        </ScrollPaginaAlertas>
        <ContainerBotoesPaginaAlertas>
          <Botao
            titulo="Cadastrar Alerta"
            onPress={() =>
              navigation.navigate("CadastroDeAlerta", {
                id_moto: id_moto,
              })
            }
            backgroundColor="#547A6E"
          />

          <Botao
            titulo="Voltar"
            onPress={() => navigation.navigate("ListaDeMotos")}
          />
        </ContainerBotoesPaginaAlertas>
      </ContainerPaginaAlertas>
    </Container>
  );
};

export default Alertas;

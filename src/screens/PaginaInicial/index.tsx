import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Container,
  ContainerBotoesPaginaInicial,
  ContainerCardsPaginaInicial,
  ContainerPaginaInicial,
  ScrollPaginaInicial,
} from "./styles";
import Cabecalho from "../../components/Cabecalho";
import Botao from "../../components/Botao";
import CardPaginaInicial from "./components/CardPaginaInicial";
import { buscarMotos } from "../../services/motoService";
import { Moto } from "../../types/types";
import Loading from "../../components/Loading";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PaginaInicial = () => {
  const navigation = useNavigation<NavigationProp>();
  const [totalMotos, setTotalMotos] = useState(0);
  const [emAnalise, setEmAnalise] = useState(0);
  const [emManutencao, setEmManutencao] = useState(0);
  const [prontas, setProntas] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const carregarDadosMotos = async () => {
      try {
        const motos = await buscarMotos();

        setTotalMotos(motos.length);

        const emAnaliseCount = motos.filter((m: Moto) => {
          const ultimaMov = m.movimentacoes[m.movimentacoes.length - 1];
          return (
            ultimaMov?.departamento_descricao === "Departamento de Avaliação"
          );
        }).length;

        const emManutencaoCount = motos.filter((m: Moto) => {
          const ultimaMov = m.movimentacoes[m.movimentacoes.length - 1];
          return (
            ultimaMov?.departamento_descricao === "Departamento de Manutenção"
          );
        }).length;

        const prontasCount = motos.filter((m: Moto) => {
          const ultimaMov = m.movimentacoes[m.movimentacoes.length - 1];
          return (
            ultimaMov?.departamento_descricao ===
            "Departamento de Prontas para Uso"
          );
        }).length;

        setEmAnalise(emAnaliseCount);
        setEmManutencao(emManutencaoCount);
        setProntas(prontasCount);
      } catch (error) {
        console.error("Erro ao carregar dados das motos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosMotos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Cabecalho titulo="Página Inicial" />

      <ContainerPaginaInicial>
        <ScrollPaginaInicial>
          <ContainerCardsPaginaInicial>
            <CardPaginaInicial
              titulo="Motos Cadastradas"
              quantidade={totalMotos}
              backgroundColor="#455A64"
            />
            <CardPaginaInicial
              titulo="Motos em Avaliação"
              quantidade={emAnalise}
              backgroundColor="#8D6E63"
            />
            <CardPaginaInicial
              titulo="Motos em Manutenção"
              quantidade={emManutencao}
              backgroundColor="#6D4C41"
            />
            <CardPaginaInicial
              titulo="Motos prontas para Uso"
              quantidade={prontas}
              backgroundColor="#547A6E"
            />
          </ContainerCardsPaginaInicial>

          <ContainerBotoesPaginaInicial>
            <Botao
              titulo="Lista de Motos"
              onPress={() => navigation.navigate("ListaDeMotos")}
            />

            <Botao
              titulo="Lista de Colaboradores"
              onPress={() => navigation.navigate("Colaboradores")}
            />
          </ContainerBotoesPaginaInicial>
        </ScrollPaginaInicial>
      </ContainerPaginaInicial>
    </Container>
  );
};

export default PaginaInicial;

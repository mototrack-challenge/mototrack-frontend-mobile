import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import QuickAccessButton from "../components/QuickAccessButton";
import Header from "../components/Header";
import { View, Text, StyleSheet, Alert } from "react-native";
import CardMovimentacao from "../components/CardMovimentacao";
import { useEffect, useState } from "react";
import { buscarMovimentacoesPorMoto, deletarMovimentacao } from "../services/movimentacaoService";
import { Movimentacao } from "../types/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MovimentacoesRouteProp = RouteProp<RootStackParamList, "Movimentacoes">;

const MovimentacoesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<MovimentacoesRouteProp>();
  const { id_moto } = route.params;
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  useEffect(() => {
    const pegarMovimentacoesDaMoto = async () => {
      try {
        const movimentacoesCadastradas = await buscarMovimentacoesPorMoto(
          id_moto
        );

        setMovimentacoes(movimentacoesCadastradas);
      } catch (error) {
        console.error("Erro ao carregar as movimentações:", error);
      }
    };

    pegarMovimentacoesDaMoto();
  }, []);

  const handleDelete = (id_movimentacao: number) => {
    Alert.alert(
        "Confirmar Exclusão",
        "Tem certeza que deseja excluir esta movimentação?",
        [
        { text: "Cancelar", style: "cancel" },
        {
            text: "Excluir",
            style: "destructive",
            onPress: async () => {
            try {
                await deletarMovimentacao(id_movimentacao);
                setMovimentacoes((prev) =>
                prev.filter((m) => m.id_movimentacao !== id_movimentacao)
                );
            } catch (error) {
                console.error("Erro ao deletar movimentação:", error);
            }
            },
        },
        ]
    );
    };

  return (
    <View style={styles.header}>
      <Header title="Movimentações" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Movimentações da moto</Text>

          <View>
            {movimentacoes.length === 0 ? (
              <Text style={styles.semMovimentacao}>
                Nenhuma movimentação cadastrada
              </Text>
            ) : (
              movimentacoes.map((movimentacao) => (
                <CardMovimentacao
                  key={movimentacao.id_movimentacao}
                  movimentacao={movimentacao}
                  onDelete={handleDelete}
                />
              ))
            )}
          </View>

          <View>
            <QuickAccessButton
              title="Cadastrar Movimentação"
              onPress={() =>
                navigation.navigate("RegisterMovimentacao", {
                  id_moto: id_moto,
                })
              }
              backgroundColor="#547A6E"
            />

            <QuickAccessButton
              title="Voltar"
              onPress={() => navigation.navigate("ListMotos")}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  content: {
    justifyContent: "center",
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  semMovimentacao: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginVertical: 20,
    fontStyle: "italic",
  },
});

export default MovimentacoesScreen;

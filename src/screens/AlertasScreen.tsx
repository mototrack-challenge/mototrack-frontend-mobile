import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import QuickAccessButton from "../components/QuickAccessButton";
import Header from "../components/Header";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Alerta } from "../types/types";
import { buscarAlertasPorMoto, deletarAlerta } from "../services/alertaService";
import CardAlerta from "../components/CardAlerta";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AlertasRouteProp = RouteProp<RootStackParamList, "Alertas">;

const AlertasScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AlertasRouteProp>();
  const { id_moto } = route.params;
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    const pegarAlertasDaMoto = async () => {
      try {
        const alertasCadastrados = await buscarAlertasPorMoto(id_moto);

        setAlertas(alertasCadastrados);
      } catch (error) {
        console.error("Erro ao carregar os alertas:", error);
      }
    };

    pegarAlertasDaMoto();
  }, []);

  const handleDelete = (id_alerta: number) => {
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
              await deletarAlerta(id_alerta);
              setAlertas((prev) =>
                prev.filter((a) => a.id_alerta !== id_alerta)
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
      <Header title="Alertas" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Alertas da moto</Text>

          <View>
            {alertas.length === 0 ? (
              <Text style={styles.semMovimentacao}>
                Nenhum alerta encontrado
              </Text>
            ) : (
              alertas.map((alerta) => (
                <CardAlerta
                  key={alerta.id_alerta}
                  alerta={alerta}
                  onDelete={handleDelete}
                />
              ))
            )}
          </View>

          <View>
            <QuickAccessButton
              title="Cadastrar Alerta"
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

export default AlertasScreen;

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import theme from "../styles/theme";
import { Alerta } from "../types/types";

type Props = {
  alerta: Alerta;
  onDelete: (id: number) => void;
};

const CardAlerta = ({ alerta, onDelete }: Props) => {
  const formatarData = (data: string) => {
    const d = new Date(data);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const corGravidade = (gravidade: string) => {
    switch (gravidade) {
      case "ALTA":
        return "red";
      case "MEDIA":
        return "orange";
      case "BAIXA":
        return "green";
      default:
        return "#000";
    }
  };

  const formartarGravidade = (gravidade: string) => {
    switch (gravidade) {
      case "ALTA":
        return "Alta";
      case "MEDIA":
        return "Média";
      case "BAIXA":
        return "Baixa";
      default:
        return gravidade;
    }
  };

  return (
    <View style={[styles.cardMovimentacao]}>
      <View style={[styles.cardMovimentacaoConteudo]}>
        <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
          Gravidade:
          <Text style={[styles.descricao, { fontFamily: theme.fonts.regular, color: corGravidade(alerta.gravidade) }]}>
            {" "}
            {formartarGravidade(alerta.gravidade)}
          </Text>
        </Text>

        <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
          Mensagem:
          <Text style={[styles.descricao, { fontFamily: theme.fonts.regular }]}>
            {" "}
            {alerta.mensagem}
          </Text>
        </Text>

        <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
          Data:
          <Text style={[styles.descricao, { fontFamily: theme.fonts.regular }]}>
            {" "}
            {formatarData(alerta.data_alerta)}
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoCardMovimentacao}
        onPress={() => onDelete(alerta.id_alerta)}
      >
        <Image
          source={require("../../assets/images/icone-deletar.png")}
          style={styles.iconeDeletar}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardMovimentacao: {
    width: "100%",
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#ECEFF1",
    borderColor: "#546E7A",
    borderWidth: 2,
  },
  alinharItems: {
    display: "flex",
    flexDirection: "row",
  },
  cardMovimentacaoConteudo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  textoData: {
    marginTop: 5,
  },
  descricao: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 7,
  },
  botaoCardMovimentacao: {
    // width: 40,
    // height: 40,
    borderRadius: 8,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D32F2F",
    marginTop: 10,
  },
  iconeDeletar: {
    width: 20,
    height: 20,
    tintColor: "#fff", // deixa o ícone branco
  },
});

export default CardAlerta;

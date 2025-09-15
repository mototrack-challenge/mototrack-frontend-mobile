import { useNavigation } from "@react-navigation/native";
import { Servico } from "../../../types/types";
import {
  BotaoConteudoCardServico,
  BotaoEditarConteudoCardServico,
  ContainerCardServico,
  ConteudoCardServico,
  DescricaoConteudoCardServico,
  TextoBotaoConteudoCardServico,
  TituloConteudoCardServico,
} from "../styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  servico: Servico;
  onDelete: (id: number) => void;
};

const CardServico = ({ servico, onDelete }: Props) => {
  const navigation = useNavigation<NavigationProp>();

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

  const formatarStatus = (status: string) => {
    switch (status) {
      case "Pendente":
        return { texto: "Pendente", cor: "gray" };
      case "EmAndamento":
        return { texto: "Em Andamento", cor: "orange" };
      case "Concluido":
        return { texto: "Concluído", cor: "green" };
      default:
        return { texto: status, cor: "#000" };
    }
  };

  return (
    <ContainerCardServico>
      <ConteudoCardServico>
        <TituloConteudoCardServico>
          Status:
          <DescricaoConteudoCardServico style={{ color: formatarStatus(servico.status).cor }}>
            {" "}
            {formatarStatus(servico.status).texto}
          </DescricaoConteudoCardServico>
        </TituloConteudoCardServico>

        <TituloConteudoCardServico>
          Descrição:
          <DescricaoConteudoCardServico>
            {" "}
            {servico.descricao}
          </DescricaoConteudoCardServico>
        </TituloConteudoCardServico>

        <TituloConteudoCardServico>
          Data:
          <DescricaoConteudoCardServico>
            {" "}
            {formatarData(servico.dataCadastro)}
          </DescricaoConteudoCardServico>
        </TituloConteudoCardServico>

        <TituloConteudoCardServico>
          Nome do Colaborador:
          <DescricaoConteudoCardServico>
            {" "}
            {servico.colaborador.nome}
          </DescricaoConteudoCardServico>
        </TituloConteudoCardServico>

        <TituloConteudoCardServico>
          Matricula:
          <DescricaoConteudoCardServico>
            {" "}
            {servico.colaborador.matricula}
          </DescricaoConteudoCardServico>
        </TituloConteudoCardServico>
      </ConteudoCardServico>

      <BotaoEditarConteudoCardServico onPress={() => navigation.navigate("EditarServico", { id_servico: servico.id, id_moto: servico.motoId })}>
        <TextoBotaoConteudoCardServico>Editar</TextoBotaoConteudoCardServico>
      </BotaoEditarConteudoCardServico>

      <BotaoConteudoCardServico onPress={() => onDelete(servico.id)}>
        <TextoBotaoConteudoCardServico>Excluir</TextoBotaoConteudoCardServico>
      </BotaoConteudoCardServico>
    </ContainerCardServico>
  );
};

export default CardServico;

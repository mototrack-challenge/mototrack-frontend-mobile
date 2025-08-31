import { Alerta } from "../../../types/types";
import { BotaoConteudoCardAlerta, ContainerCardAlerta, ConteudoCardAlerta, DescricaoConteudoCardAlerta, TextoBotaoConteudoCardAlerta, TituloConteudoCardAlerta } from "../styles";

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
    <ContainerCardAlerta>
      <ConteudoCardAlerta>
        <TituloConteudoCardAlerta>
          Gravidade:
          <DescricaoConteudoCardAlerta style={{ color: corGravidade(alerta.gravidade) }}>
            {" "}
            {formartarGravidade(alerta.gravidade)}
          </DescricaoConteudoCardAlerta>
        </TituloConteudoCardAlerta>

        <TituloConteudoCardAlerta>
          Mensagem:
          <DescricaoConteudoCardAlerta>
            {" "}
            {alerta.mensagem}
          </DescricaoConteudoCardAlerta>
        </TituloConteudoCardAlerta>

        <TituloConteudoCardAlerta>
          Data:
          <DescricaoConteudoCardAlerta>
            {" "}
            {formatarData(alerta.data_alerta)}
          </DescricaoConteudoCardAlerta>
        </TituloConteudoCardAlerta>
      </ConteudoCardAlerta>

      <BotaoConteudoCardAlerta onPress={() => onDelete(alerta.id_alerta)}>
        <TextoBotaoConteudoCardAlerta>Excluir</TextoBotaoConteudoCardAlerta>
      </BotaoConteudoCardAlerta>
    </ContainerCardAlerta>
  );
};

export default CardAlerta;

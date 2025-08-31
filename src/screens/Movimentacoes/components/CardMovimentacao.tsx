import { Movimentacao } from "../../../types/types";
import { BotaoConteudoCardMovimentacao, ContainerCardMovimentacao, ConteudoCardMovimentacao, DescricaoConteudoCardMoto, TextoBotaoConteudoCardMovimentacao, TituloConteudoCardMoto } from "../styles";

type Props = {
  movimentacao: Movimentacao;
  onDelete: (id: number) => void;
};

const CardMovimentacao = ({ movimentacao, onDelete }: Props) => {

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

  return(
    <ContainerCardMovimentacao>

        <ConteudoCardMovimentacao>

            <TituloConteudoCardMoto>
                Departamento:
                <DescricaoConteudoCardMoto>{' '} {movimentacao.departamento_descricao}</DescricaoConteudoCardMoto>
            </TituloConteudoCardMoto>

            <TituloConteudoCardMoto>
                Data:
                <DescricaoConteudoCardMoto>{' '} {formatarData(movimentacao.data_movimentacao)}</DescricaoConteudoCardMoto>
            </TituloConteudoCardMoto>

        </ConteudoCardMovimentacao>

        <BotaoConteudoCardMovimentacao onPress={() => onDelete(movimentacao.id_movimentacao)}>
            <TextoBotaoConteudoCardMovimentacao>Excluir</TextoBotaoConteudoCardMovimentacao>
        </BotaoConteudoCardMovimentacao>

    </ContainerCardMovimentacao>
  );
};

export default CardMovimentacao;

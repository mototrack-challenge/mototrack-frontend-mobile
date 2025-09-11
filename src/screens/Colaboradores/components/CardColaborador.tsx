import { Colaborador } from "../../../types/types";
import { BotaoEditarConteudoCardColaboradores, BotaoExcluirConteudoCardColaboradores, ContainerCardColaborador, ConteudoCardColaborador, DescricaoConteudoCardColaboradores, TextoBotaoConteudoCardColaboradores, TituloConteudoCardColaboradores } from "../styles";

type Props = {
  colaborador: Colaborador;
  onDelete: (id: number) => void;
};

const CardColaborador = ({ colaborador, onDelete }: Props) => {

    return (
        <ContainerCardColaborador>

            <ConteudoCardColaborador>

                <TituloConteudoCardColaboradores>
                    Nome:
                    <DescricaoConteudoCardColaboradores>{' '} {colaborador.nome}</DescricaoConteudoCardColaboradores>
                </TituloConteudoCardColaboradores>

                <TituloConteudoCardColaboradores>
                    Matrícula:
                    <DescricaoConteudoCardColaboradores>{' '} {colaborador.matricula}</DescricaoConteudoCardColaboradores>
                </TituloConteudoCardColaboradores>

                <TituloConteudoCardColaboradores>
                    Email:
                    <DescricaoConteudoCardColaboradores>{' '} {colaborador.email}</DescricaoConteudoCardColaboradores>
                </TituloConteudoCardColaboradores>

            </ConteudoCardColaborador>

            <BotaoEditarConteudoCardColaboradores>
                        <TextoBotaoConteudoCardColaboradores>Editar</TextoBotaoConteudoCardColaboradores>
            </BotaoEditarConteudoCardColaboradores>

            <BotaoExcluirConteudoCardColaboradores onPress={() => onDelete(colaborador.id)}>
                        <TextoBotaoConteudoCardColaboradores>Excluir</TextoBotaoConteudoCardColaboradores>
            </BotaoExcluirConteudoCardColaboradores>

        </ContainerCardColaborador>
    );
};

export default CardColaborador;

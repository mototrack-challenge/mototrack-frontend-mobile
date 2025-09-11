import { useNavigation } from "@react-navigation/native";
import { Colaborador } from "../../../types/types";
import { BotaoEditarConteudoCardColaboradores, BotaoExcluirConteudoCardColaboradores, ContainerCardColaborador, ConteudoCardColaborador, DescricaoConteudoCardColaboradores, TextoBotaoConteudoCardColaboradores, TituloConteudoCardColaboradores } from "../styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  colaborador: Colaborador;
  onDelete: (id: number) => void;
};

const CardColaborador = ({ colaborador, onDelete }: Props) => {
    const navigation = useNavigation<NavigationProp>();

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

            <BotaoEditarConteudoCardColaboradores onPress={() => navigation.navigate("EditarColaborador", { id_colaborador: colaborador.id })}>
                        <TextoBotaoConteudoCardColaboradores>Editar</TextoBotaoConteudoCardColaboradores>
            </BotaoEditarConteudoCardColaboradores>

            <BotaoExcluirConteudoCardColaboradores onPress={() => onDelete(colaborador.id)}>
                        <TextoBotaoConteudoCardColaboradores>Excluir</TextoBotaoConteudoCardColaboradores>
            </BotaoExcluirConteudoCardColaboradores>

        </ContainerCardColaborador>
    );
};

export default CardColaborador;

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";
import { Moto, Servico } from "../../../types/types";
import { useNavigation } from "@react-navigation/native";
import { BotaoConteudoCardMotoAlertas, BotaoConteudoCardMotoDeletar, BotaoConteudoCardMotoEditar, BotaoConteudoCardMotoMovimentacoes, BotaoConteudoCardMotoServicos, BotoesConteudoCardMoto, CabecalhoCardMoto, ContainerCardMoto, ConteudoCardMoto, DescricaoConteudoCardMoto, ImagemCabecalhoCardMoto, TextoBotaoConteudoCardMoto, TituloCabecalhoCardMoto, TituloConteudoCardMoto } from "../styles";
import { Text } from "react-native";
import theme from "../../../styles/theme";
import { useEffect, useState } from "react";
import { buscarServicosPorMoto } from "../../../services/servicoService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  moto: Moto;
  onDelete: (id: number) => void;
};

const CardMoto = ({ moto, onDelete }: Props) => {
    const navigation = useNavigation<NavigationProp>();
    const [servicos, setServicos] = useState<Servico[]>([]);

    useEffect(() => {
        const carregarServicosMoto= async (idMoto: number) => {
            const servicosMoto = await buscarServicosPorMoto(idMoto);

            setServicos(servicosMoto);
            console.log(servicos);
            
        };

        carregarServicosMoto(moto.id_moto);
    }, []);

    const formatarModelo = (modelo: string) => {
        switch (modelo) {
        case "MOTTU_POP":
            return "Mottu-Pop";
        case "MOTTU_E":
            return "Mottu-E";
        case "MOTTU_SPORT":
            return "Mottu-Sport";
        default:
            return modelo;
        }
    };

    const definirImagem = (modelo: string) => {
        switch (modelo) {
        case "MOTTU_POP":
            return require("../../../../assets/images/mottu-pop.png");
        case "MOTTU_E":
            return require("../../../../assets/images/mottu-e.png");
        case "MOTTU_SPORT":
            return require("../../../../assets/images/mottu-sport.png");
        default:
            return require("../../../../assets/images/mottu-pop.png");
        }
    };

    const formartarStatus = (status: string) => {
        switch (status) {
        case "AVALIACAO":
            return "Avaliação";
        case "MANUTENCAO":
            return "Manutenção";
        case "PRONTA_PARA_USO":
            return "Pronta para uso";
        default:
            return status;
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

    return(
        <ContainerCardMoto>

            <CabecalhoCardMoto>

                <TituloCabecalhoCardMoto>{formatarModelo(moto.modelo)}</TituloCabecalhoCardMoto>
                <ImagemCabecalhoCardMoto source={definirImagem(moto.modelo)}/>

            </CabecalhoCardMoto>

            <ConteudoCardMoto>

                <TituloConteudoCardMoto>
                    Placa:
                    <DescricaoConteudoCardMoto>
                        {" "} {moto.placa}
                    </DescricaoConteudoCardMoto>

                </TituloConteudoCardMoto>

                <TituloConteudoCardMoto>
                    Número do chassi:
                    <DescricaoConteudoCardMoto>
                        {" "} {moto.chassi}
                    </DescricaoConteudoCardMoto>

                </TituloConteudoCardMoto>

                <TituloConteudoCardMoto>
                    Status:
                    <DescricaoConteudoCardMoto>
                        {" "} {formartarStatus(moto.status)}
                    </DescricaoConteudoCardMoto>

                </TituloConteudoCardMoto>

                <TituloConteudoCardMoto>Movimentações:</TituloConteudoCardMoto>

                {moto.movimentacoes.length > 0 ? (
                moto.movimentacoes.map((mov, index) => (
                    <Text
                    key={index}
                    style={{
                        fontFamily: theme.fonts.regular,
                        marginLeft: 10,
                        fontSize: 14,
                        marginBottom: 5,
                    }}
                    >
                    • {mov.departamento_descricao} (
                    {new Date(mov.data_movimentacao).toLocaleString()})
                    </Text>
                ))
                ) : (
                <Text
                    style={{
                    fontFamily: theme.fonts.regular,
                    marginLeft: 10,
                    fontSize: 14,
                    marginBottom: 5,
                    fontStyle: "italic",
                    color: "#666",
                    }}
                >
                    Nenhuma movimentação cadastrada
                </Text>
                )}

                <TituloConteudoCardMoto>Serviços:</TituloConteudoCardMoto>

                {moto.alertas.length > 0 && (
                <>
                    <TituloConteudoCardMoto>Alertas:</TituloConteudoCardMoto>
                    {moto.alertas.map((alerta) => (
                    <Text
                        key={alerta.id_alerta}
                        style={{
                        fontFamily: theme.fonts.regular,
                        color: corGravidade(alerta.gravidade),
                        }}
                    >
                        • [{formartarGravidade(alerta.gravidade)}] {alerta.mensagem}
                    </Text>
                    ))}
                </>
                )} 

            </ConteudoCardMoto>

            <BotoesConteudoCardMoto>

                <BotaoConteudoCardMotoEditar onPress={() => navigation.navigate("EditarMoto", { id_moto: moto.id_moto })}>
                    <TextoBotaoConteudoCardMoto>Editar</TextoBotaoConteudoCardMoto>
                </BotaoConteudoCardMotoEditar>

                <BotaoConteudoCardMotoMovimentacoes onPress={() => navigation.navigate("Movimentacoes", { id_moto: moto.id_moto })}>
                    <TextoBotaoConteudoCardMoto>Movimentações</TextoBotaoConteudoCardMoto>
                </BotaoConteudoCardMotoMovimentacoes>

                <BotaoConteudoCardMotoServicos>
                    <TextoBotaoConteudoCardMoto>Serviços</TextoBotaoConteudoCardMoto>
                </BotaoConteudoCardMotoServicos>

                <BotaoConteudoCardMotoAlertas onPress={() => navigation.navigate("Alertas", { id_moto: moto.id_moto })}>
                    <TextoBotaoConteudoCardMoto>Alertas</TextoBotaoConteudoCardMoto>
                </BotaoConteudoCardMotoAlertas>

                <BotaoConteudoCardMotoDeletar onPress={() => onDelete(moto.id_moto)}>
                    <TextoBotaoConteudoCardMoto>Deletar</TextoBotaoConteudoCardMoto>
                </BotaoConteudoCardMotoDeletar>

            </BotoesConteudoCardMoto>

        </ContainerCardMoto>
    );
};

export default CardMoto;
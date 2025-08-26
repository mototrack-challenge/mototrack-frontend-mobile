import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import QuickAccessButton from './QuickAccessButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type MotoProps = {
    id_moto: number;
    placa: string;
    chassi: string;
    modelo: string;
    status: string;
    movimentacoes: Movimentacao[];
    alertas: Alerta[];
};

type Movimentacao = {
    departamento_descricao: string;
    data_movimentacao: string;
};

type Alerta = {
    id_alerta: number;
    gravidade: string;
    mensagem: string;
};

const CardMoto = ({ moto }: { moto: MotoProps }) => {
    const navigation = useNavigation<NavigationProp>();

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
                return require("../../assets/images/mottu-pop.png");
            case "MOTTU_E":
                return require("../../assets/images/mottu-e.png");
            case "MOTTU_SPORT":
                return require("../../assets/images/mottu-sport.png");
            default:
                return require("../../assets/images/mottu-pop.png");
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

    return (
        <View style={[styles.cardMoto]}>

            <View style={[styles.cabecalhoCardMoto]}>
                <Text style={[styles.title, { fontFamily: theme.fonts.bold }]}>{formatarModelo(moto.modelo)}</Text>
                <Image
                    source={definirImagem(moto.modelo)}
                    style={styles.imagemMoto}
                />
            </View>

            <View>
                <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
                    Placa:
                    <Text style={[styles.descricao, { fontFamily: theme.fonts.regular }]}> {' '} {moto.placa}</Text>
                </Text>

                <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
                    Número do chassi:
                    <Text style={[styles.descricao, { fontFamily: theme.fonts.regular }]}> {' '} {moto.chassi}</Text>
                </Text>

                <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
                    Status:
                    <Text style={[styles.descricao, { fontFamily: theme.fonts.regular }]}> {' '} {formartarStatus(moto.status)}</Text>
                </Text>

                <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
                    Movimentações:
                </Text>

                {moto.movimentacoes.length > 0 ? (
                    moto.movimentacoes.map((mov, index) => (
                        <Text
                            key={index}
                            style={{ fontFamily: theme.fonts.regular, marginLeft: 10, fontSize: 14, marginBottom: 5 }}
                        >
                            • {mov.departamento_descricao} ({new Date(mov.data_movimentacao).toLocaleString()})
                        </Text>
                    ))
                ) : (
                    <Text style={{ fontFamily: theme.fonts.regular, marginLeft: 10, fontSize: 14, marginBottom: 5, fontStyle: 'italic', color: '#666' }}>
                        Nenhuma movimentação cadastrada
                    </Text>
                )}

                <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
                    Serviços:
                </Text>

                {moto.alertas.length > 0 && (
                    <>
                        <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
                            Alertas:
                        </Text>
                        {moto.alertas.map(alerta => (
                            <Text
                                key={alerta.id_alerta}
                                style={{ fontFamily: theme.fonts.regular, color: alerta.gravidade === 'ALTA' ? 'red' : 'orange' }}
                            >
                                • [{formartarGravidade(alerta.gravidade)}] {alerta.mensagem}
                            </Text>
                        ))}
                    </>
                )}

            </View>

            <View style={[styles.botoesCardMoto]}>

                <TouchableOpacity
                    style={[styles.botaoCardMoto, styles.botaoEditar]}
                >
                    <Text style={[styles.textoBotao, { fontFamily: theme.fonts.regular }]}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botaoCardMoto, styles.botaoMover]}
                >
                    <Text style={[styles.textoBotao, { fontFamily: theme.fonts.regular }]}>Mover Departamento</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botaoCardMoto, styles.botaoServico]}
                >
                    <Text style={[styles.textoBotao, { fontFamily: theme.fonts.regular }]}>Serviços</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botaoCardMoto, styles.botaoDeletar]}
                >
                    <Text style={[styles.textoBotao, { fontFamily: theme.fonts.regular }]}>Deletar</Text>
                </TouchableOpacity>

            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    cardMoto: {
        width: '100%',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#ECEFF1',
        borderColor: '#546E7A',
        borderWidth: 2,
    },
    cabecalhoCardMoto: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5
    },
    imagemMoto: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        color: '#455A64',
        fontWeight: 'bold',
    },
    descricao: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 7
    },
    botoesCardMoto: {
        marginTop: 20
    },
    botaoCardMoto: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 9,
        borderRadius: 8,
        marginBottom: 7,
    },
    textoBotao: {
        fontSize: 14,
        color: '#fff',
    },
    botaoEditar: { backgroundColor: '#37474F' },
    botaoMover: { backgroundColor: '#546E7A' },
    botaoServico: { backgroundColor: '#1976D2' },
    botaoDeletar: { backgroundColor: '#D32F2F' },
});

export default CardMoto;
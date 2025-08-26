import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import theme from '../styles/theme';

type MovimentacaoProps = {
    id_movimentacao: number;
    moto_id: number;
    departamento_id: number;
    departamento_descricao: string;
    data_movimentacao: string;
};

const CardMovimentacao = ({ movimentacao }: { movimentacao: MovimentacaoProps }) => {

    const formatarData = (data: string) => {
        const d = new Date(data);
        return d.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    return (
        <View style={[styles.cardMovimentacao]}>

            <View style={[styles.cardMovimentacaoConteudo]}>

                <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
                    Departamento:
                    <Text style={[styles.descricao, { fontFamily: theme.fonts.regular }]}> {' '} {movimentacao.departamento_descricao}</Text>
                </Text>

                <Text style={[styles.descricao, { fontFamily: theme.fonts.bold }]}>
                    Data:
                    <Text style={[styles.descricao, { fontFamily: theme.fonts.regular }]}> {' '} {formatarData(movimentacao.data_movimentacao)}</Text>
                </Text>

            </View>

            <TouchableOpacity
                style={styles.botaoCardMovimentacao}
            >
                <Image
                    source={require('../../assets/images/icone-deletar.png')}
                    style={styles.iconeDeletar}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cardMovimentacao: {
        width: '100%',
        padding: 10,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#ECEFF1',
        borderColor: '#546E7A',
        borderWidth: 2,
    },
    cardMovimentacaoConteudo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 5
    },
    descricao: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 7
    },
    botaoCardMovimentacao: {
        // width: 40,
        // height: 40,
        borderRadius: 8,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D32F2F',
        marginTop: 10
    },
    iconeDeletar: {
        width: 20,
        height: 20,
        tintColor: '#fff' // deixa o ícone branco
    }
});

export default CardMovimentacao;
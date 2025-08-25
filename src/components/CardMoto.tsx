import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import QuickAccessButton from './QuickAccessButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CardMoto = () => {
    const navigation = useNavigation<NavigationProp>();

    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    return (
        <View style={[styles.cardMoto]}>

            <View style={[styles.cabecalhoCardMoto]}>
                <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>Mottu-E</Text>
                <Image
                    source={require('../../assets/images/mottu-e.png')}
                    style={styles.imagemMoto}
                />
            </View>

            <View>
                <Text style={[styles.descricao, { fontFamily: 'MontserratBold' }]}>
                    Placa:
                    <Text style={[styles.descricao, { fontFamily: 'MontserratRegular' }]}> {' '} ABC1234</Text>
                </Text>

                <Text style={[styles.descricao, { fontFamily: 'MontserratBold' }]}>
                    Número do chassi:
                    <Text style={[styles.descricao, { fontFamily: 'MontserratRegular' }]}> {' '} 23131231323av</Text>
                </Text>

                <Text style={[styles.descricao, { fontFamily: 'MontserratBold' }]}>
                    Status:
                    <Text style={[styles.descricao, { fontFamily: 'MontserratRegular' }]}> {' '} Em análise</Text>
                </Text>

                <Text style={[styles.descricao, { fontFamily: 'MontserratBold' }]}>
                    Movimentações:
                </Text>

                <Text style={[styles.descricao, { fontFamily: 'MontserratBold' }]}>
                    Serviços:
                </Text>

            </View>

            <View style={[styles.botoesCardMoto]}>

                <TouchableOpacity
                    style={[styles.botaoCardMoto, styles.botaoEditar]}  
                >
                    <Text style={[styles.textoBotao, { fontFamily: 'MontserratRegular' }]}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botaoCardMoto, styles.botaoMover]}  
                >
                    <Text style={[styles.textoBotao, { fontFamily: 'MontserratRegular' }]}>Mover Departamento</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botaoCardMoto, styles.botaoServico]}  
                >
                    <Text style={[styles.textoBotao, { fontFamily: 'MontserratRegular' }]}>Serviços</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botaoCardMoto, styles.botaoDeletar]}  
                >
                    <Text style={[styles.textoBotao, { fontFamily: 'MontserratRegular' }]}>Deletar</Text>
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
        marginBottom: 5
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
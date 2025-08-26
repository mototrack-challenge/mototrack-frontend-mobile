import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import QuickAccessButton from "../components/QuickAccessButton";
import Header from "../components/Header";
import { View, Text, StyleSheet } from 'react-native';
import CardMovimentacao from "../components/CardMovimentacao";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MovimentacoesRouteProp = RouteProp<RootStackParamList, 'Movimentacoes'>;

const MovimentacoesScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<MovimentacoesRouteProp>();
    const { movimentacoes } = route.params;

    return (
        <View style={styles.header}>
            <Header title="Movimentações" />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>

                    <Text style={styles.title}>Movimentações da moto</Text>

                    <View>
                        {movimentacoes.length === 0 ? (
                            <Text style={styles.semMovimentacao}>Nenhuma movimentação cadastrada</Text>
                        ) : (
                            movimentacoes.map((movimentacao) => <CardMovimentacao key={movimentacao.id_movimentacao} movimentacao={movimentacao}/>)
                        )}
                    </View>

                    <View>
                        <QuickAccessButton
                            title="Cadastrar Movimentação"
                            onPress={() => navigation.navigate('RegisterMoto')}
                            backgroundColor='#547A6E'
                        />

                        <QuickAccessButton
                            title="Voltar"
                            onPress={() => navigation.navigate('ListMotos')}
                        />
                    </View>

                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    content: {
        justifyContent: 'center',
    },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    semMovimentacao: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginVertical: 20,
        fontStyle: 'italic'
    },
});

export default MovimentacoesScreen;
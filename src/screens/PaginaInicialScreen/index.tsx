import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Container, ContainerBotoesPaginaInicial, ContainerCardsPaginaInicial, ContainerPaginaInicial, ScrollPaginaInicial } from "./styles";
import Cabecalho from "../../components/Cabecalho";
import Botao from "../../components/Botao";
import CardPaginaInicial from "./components/CardPaginaIncial";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PaginaInicial = () => {
    const navigation = useNavigation<NavigationProp>();
    const [totalMotos, setTotalMotos] = useState(0);
    const [emAnalise, setEmAnalise] = useState(0);
    const [emManutencao, setEmManutencao] = useState(0);
    const [prontas, setProntas] = useState(0);

    return (
        <Container>
            <Cabecalho titulo="Página Inicial"/>

            <ContainerPaginaInicial>

                <ScrollPaginaInicial>

                    <ContainerCardsPaginaInicial>
                        <CardPaginaInicial titulo="Motos Cadastradas" quantidade={totalMotos} backgroundColor="#455A64" />
                        <CardPaginaInicial titulo="Motos em Avaliação" quantidade={emAnalise} backgroundColor="#8D6E63" />
                        <CardPaginaInicial titulo="Motos em Manutenção" quantidade={emManutencao} backgroundColor="#6D4C41" />
                        <CardPaginaInicial titulo="Motos prontas para Uso" quantidade={prontas} backgroundColor="#547A6E" />
                    </ContainerCardsPaginaInicial>

                    <ContainerBotoesPaginaInicial>

                        <Botao
                            titulo="Lista de Motos"
                            onPress={() => navigation.navigate('ListMotos')}
                        />

                        <Botao
                            titulo="Lista de Colaboradores"
                            onPress={() => navigation.navigate('ListMotos')}
                        />

                    </ContainerBotoesPaginaInicial>

                </ScrollPaginaInicial>

            </ContainerPaginaInicial>
        </Container>
    );
};

export default PaginaInicial;
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BotaoCabecalho, ContainerCabecalho, TextoBotaoCabecalho, TituloCabecalho } from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CabecalhoProps {
  titulo: string;
}

const Cabecalho = ({ titulo }: CabecalhoProps) => {
    const navigation = useNavigation<NavigationProp>();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('LoggedUser');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível realizar o logout.');
        }
    };

    return (
        <ContainerCabecalho>
            <TituloCabecalho>{titulo}</TituloCabecalho>

            <BotaoCabecalho onPress={handleLogout}>
                <TextoBotaoCabecalho>Logout</TextoBotaoCabecalho>
            </BotaoCabecalho>
        </ContainerCabecalho>
    );
};

export default Cabecalho;
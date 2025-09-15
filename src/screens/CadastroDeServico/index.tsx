import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { buscarColaboradores } from "../../services/colaboradorService";
import { Botoes, Container, ContainerCadastroDoServico, ContainerDropDown, ContainerPaginaCadastroDeServico, DropDownInputStyle, Input, Label, MensagemErro, MensagemSucesso, ScrollPaginaCadastroDeServico, TituloCadastroDoServico } from "./styles";
import Cabecalho from "../../components/Cabecalho";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../../styles/theme";
import Botao from "../../components/Botao";
import { Colaborador } from "../../types/types";
import { cadastrarServico } from "../../services/servicoService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RegisterServicoRouteProp = RouteProp<RootStackParamList,"CadastroDeServico">;

type DropDownItem = {
  label: string;
  value: string;
};

const CadastroDeServico = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RegisterServicoRouteProp>();
    const { id_moto } = route.params;

    const [descricao, setDescricao] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [idColaborador, setIdColaborador] = useState<string>("");
    const [openStatus, setOpenStatus] = useState(false);
    const [itensStatus, setItensStatus] = useState([
        { label: "Pendente", value: "Pendente" },
        { label: "Em Andamento", value: "EmAndamento" },
        { label: "Concluído", value: "Concluido" },
    ]);
    const [openColaborador, setOpenColaborador] = useState(false);
    const [itensColaboradores, setItensColaboradores] = useState<DropDownItem[]>([]);
    const [mensagemErro, setMensagemErro] = useState<string>("");
    const [mensagemSucesso, SetMensagemSucesso] = useState<string>("");

    useEffect(() => {
    const pegarColaboradores = async () => {
        try {
        const colaboradoresCadastrados: Colaborador[] = await buscarColaboradores();

        const itens = colaboradoresCadastrados.map(colab => ({
            label: `${colab.nome} - ${colab.matricula}`,
            value: colab.id.toString(),
        }));

      setItensColaboradores(itens);

        } catch (error) {
        console.error("Erro ao carregar os colaboradores:", error);
        }
    };

    pegarColaboradores();
    }, []);

    const handleCadastrarServico = async () => {
        if (!descricao || !status || !idColaborador) {
            setMensagemErro("Preencha todos os campos!");
            return;
        }

        try {
            await cadastrarServico({
                descricao: descricao,
                status: status,
                motoId: id_moto,
                colaboradorId: Number(idColaborador)
            });

            setMensagemErro("");
            SetMensagemSucesso("Serviço cadastrado com sucesso!");

            setTimeout(() => {
                SetMensagemSucesso("");
                navigation.navigate("Servicos", { id_moto: id_moto });
            }, 2000);
        } catch (error) {
            console.error("Erro no cadastro do serviço:", error);
            setMensagemErro("Erro ao conectar com o servidor");
        }
    }

    return(
        <Container>
            <Cabecalho titulo="Cadastrar Serviço" />

            <ContainerPaginaCadastroDeServico>
                <ScrollPaginaCadastroDeServico>
                <ContainerCadastroDoServico>
                    <TituloCadastroDoServico>
                    Preecha todos os dados
                    </TituloCadastroDoServico>

                    <Label>Descrição</Label>
                    <Input
                    placeholder="Ex: Troca de óleo da moto"
                    placeholderTextColor="#999"
                    value={descricao}
                    onChangeText={setDescricao}
                    selectionColor="black"
                    underlineColorAndroid="transparent"
                    />

                    <ContainerDropDown zIndexValue={openStatus ? 3000 : 1000}>
                    <Label>Status</Label>
                    <DropDownPicker
                        open={openStatus}
                        value={status}
                        items={itensStatus}
                        setOpen={setOpenStatus}
                        setValue={setStatus}
                        setItems={setItensStatus}
                        placeholder="Selecione um status"
                        style={DropDownInputStyle}
                        zIndex={3000}
                        zIndexInverse={1000}
                        textStyle={{
                        fontFamily: theme.fonts.regular,
                        fontSize: 14,
                        color: "#000",
                        }}
                        placeholderStyle={{
                        fontFamily: theme.fonts.regular,
                        color: "#999",
                        }}
                    />
                    </ContainerDropDown>

                    <ContainerDropDown zIndexValue={openColaborador ? 3000 : 1000}>
                    <Label>Colaborador</Label>
                    <DropDownPicker
                        open={openColaborador}
                        value={idColaborador}
                        items={itensColaboradores}
                        setOpen={setOpenColaborador}
                        setValue={setIdColaborador}
                        setItems={setItensColaboradores}
                        placeholder="Selecione um colaborador"
                        style={DropDownInputStyle}
                        zIndex={3000}
                        zIndexInverse={1000}
                        textStyle={{
                        fontFamily: theme.fonts.regular,
                        fontSize: 14,
                        color: "#000",
                        }}
                        placeholderStyle={{
                        fontFamily: theme.fonts.regular,
                        color: "#999",
                        }}
                    />
                    </ContainerDropDown>

                    {mensagemSucesso ? (<MensagemSucesso>{mensagemSucesso}</MensagemSucesso>) : null}
                    {mensagemErro ? <MensagemErro>{mensagemErro}</MensagemErro> : null}

                    <Botoes>
                    <Botao
                        titulo="Cadastrar Serviço"
                        onPress={handleCadastrarServico}
                        backgroundColor="#547A6E"
                    />

                    <Botao
                        titulo="Voltar"
                        onPress={() => navigation.goBack()}
                    />
                    </Botoes>
                </ContainerCadastroDoServico>
                </ScrollPaginaCadastroDeServico>
            </ContainerPaginaCadastroDeServico>
        </Container>
    );
};

export default CadastroDeServico;
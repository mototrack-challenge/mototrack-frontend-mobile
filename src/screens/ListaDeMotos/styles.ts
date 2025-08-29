import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
    flex: 1;
`;

export const ContainerPaginaListaDeMotos = styled.View`
    flex: 1;
    padding: 10px;
    background-color: #FFF;
`;

export const ScrollPaginaListaDeMotos = styled.ScrollView.attrs(() => ({
    contentContainerStyle: { justifyContent: 'center', flexGrow: 1 }
}))``;

export const ContainerListaDeMotos = styled.View`
    justify-content: center;
`;

export const TextoNenhumaMotoCadastrada = styled.Text`
    text-align: center;
    font-size: 16px;
    color: #666;
    margin-vertical: 20px;
    font-style: italic;
`;

export const ContainerBotoesPaginaListaDeMotos = styled.View`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const ContainerCardMoto = styled.View`
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
    background-color: #ECEFF1;
    border-color: #546E7A;
    border-width: 2px;
`;

export const CabecalhoCardMoto = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`;

export const TituloCabecalhoCardMoto = styled.Text`
    font-size: 16px;
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.bold};
`;

export const ImagemCabecalhoCardMoto = styled.Image`
    width: 150px;
    height: 150px;
    resizeMode: contain;
`;

export const ConteudoCardMoto = styled.View`
    justify-content: center;
`;

export const TituloConteudoCardMoto = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-bottom: 7px;
    font-family: ${theme.fonts.bold};
`;

export const DescricaoConteudoCardMoto = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-bottom: 7px;
    font-family: ${theme.fonts.regular};
`;

export const BotoesConteudoCardMoto = styled.View`
    margin-top: 20px;
`;

export const BotaoConteudoCardMotoEditar = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 9px;
    border-radius: 8px;
    margin-bottom: 7px;
    background-color: #37474F;
`;

export const BotaoConteudoCardMotoMovimentacoes = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 9px;
    border-radius: 8px;
    margin-bottom: 7px;
    background-color: #546E7A;
`;

export const BotaoConteudoCardMotoServicos = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 9px;
    border-radius: 8px;
    margin-bottom: 7px;
    background-color: #1976D2;
`;

export const BotaoConteudoCardMotoAlertas = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 9px;
    border-radius: 8px;
    margin-bottom: 7px;
    background-color: #1565C0;
`;

export const BotaoConteudoCardMotoDeletar = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 9px;
    border-radius: 8px;
    margin-bottom: 7px;
    background-color: #D32F2F;
`;

export const TextoBotaoConteudoCardMoto = styled.Text`
    font-size: 14px;
    color: #fff;
`;
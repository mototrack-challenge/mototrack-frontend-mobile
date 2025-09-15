import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
    flex: 1;
`;

export const ContainerPaginaServicos = styled.View`
    flex: 1;
    padding: 16px;
    background-color: #FFF;
`;

export const ScrollPaginaServicos = styled.ScrollView.attrs(() => ({
    contentContainerStyle: { justifyContent: 'center'}
}))``;

export const TituloServicos = styled.Text`
    font-size: 18px;
    margin-bottom: 8px;
    text-align: left;
    font-family: ${theme.fonts.bold};
`;

export const TextoNenhumServicoCadastrado = styled.Text`
    text-align: center;
    font-size: 16px;
    color: #666;
    margin-vertical: 20px;
    font-style: italic;
`;

export const ContainerCardsServicos = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const ContainerBotoesPaginaServicos = styled.View`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
`;

export const ContainerCardServico = styled.View`
    width: 100%;
    padding: 10px;
    border-radius: 12px;
    margin-bottom: 16px;
    background-color: #ECEFF1;
    border-color: #546E7A;
    border-width: 2px;
`;

export const ConteudoCardServico = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
`;

export const TituloConteudoCardServico = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-bottom: 7px;
    font-family: ${theme.fonts.bold};
`;

export const DescricaoConteudoCardServico = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-bottom: 7px;
    font-family: ${theme.fonts.regular};
`;

export const BotaoEditarConteudoCardServico = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 8px;
    margin-bottom: 5px;
    background-color: #546E7A;
`;

export const BotaoConteudoCardServico = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #D32F2F;
`;

export const TextoBotaoConteudoCardServico = styled.Text`
    font-size: 14px;
    color: #fff;
`;
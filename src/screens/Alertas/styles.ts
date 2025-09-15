import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
    flex: 1;
`;

export const ContainerPaginaAlertas = styled.View`
    flex: 1;
    padding: 16px;
    background-color: #FFF;
`;

export const ScrollPaginaAlertas = styled.ScrollView.attrs(() => ({
    contentContainerStyle: { justifyContent: 'center'}
}))``;

export const TituloAlertas = styled.Text`
    font-size: 18px;
    margin-bottom: 8px;
    text-align: left;
    font-family: ${theme.fonts.bold};
`;

export const TextoNenhumaAlertaCadastrado = styled.Text`
    text-align: center;
    font-size: 16px;
    color: #666;
    margin-vertical: 20px;
    font-style: italic;
`;

export const ContainerCardsAlertas = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const ContainerBotoesPaginaAlertas = styled.View`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
`;

export const ContainerCardAlerta = styled.View`
    width: 100%;
    padding: 10px;
    border-radius: 12px;
    margin-bottom: 16px;
    background-color: #ECEFF1;
    border-color: #546E7A;
    border-width: 2px;
`;

export const ConteudoCardAlerta = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
`;

export const TituloConteudoCardAlerta = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-bottom: 7px;
    font-family: ${theme.fonts.bold};
`;

export const DescricaoConteudoCardAlerta = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-bottom: 7px;
    font-family: ${theme.fonts.regular};
`;

export const BotaoConteudoCardAlerta = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #D32F2F;
`;

export const TextoBotaoConteudoCardAlerta = styled.Text`
    font-size: 14px;
    color: #fff;
`;
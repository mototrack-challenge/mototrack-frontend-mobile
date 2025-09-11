import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
    flex: 1;
`;

export const ContainerPaginaColaboradores = styled.View`
    flex: 1;
    padding: 10px;
    background-color: #FFF;
`;

export const ScrollPaginaColaboradores = styled.ScrollView.attrs(() => ({
    contentContainerStyle: { justifyContent: 'center'}
}))``;

export const TituloColaboradores = styled.Text`
    font-size: 18px;
    margin-bottom: 8px;
    text-align: left;
    font-family: ${theme.fonts.bold};
`;

export const TextoNenhumColaboradorCadastrada = styled.Text`
    text-align: center;
    font-size: 16px;
    color: #666;
    margin-vertical: 20px;
    font-style: italic;
`;

export const ContainerCardsColaboradores = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const ContainerBotoesPaginaColaboradores = styled.View`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
`;

export const ContainerCardColaborador = styled.View`
    width: 100%;
    padding: 10px;
    border-radius: 12px;
    margin-bottom: 16px;
    background-color: #ECEFF1;
    border-color: #546E7A;
    border-width: 2px;
`;

export const ConteudoCardColaborador = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
`;

export const TituloConteudoCardColaboradores = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-bottom: 7px;
    font-family: ${theme.fonts.bold};
`;

export const DescricaoConteudoCardColaboradores = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-bottom: 7px;
    font-family: ${theme.fonts.regular};
`;

export const BotaoExcluirConteudoCardColaboradores = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #D32F2F;
`;

export const BotaoEditarConteudoCardColaboradores = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #546E7A;
`;

export const TextoBotaoConteudoCardColaboradores = styled.Text`
    font-size: 14px;
    color: #fff;
`;
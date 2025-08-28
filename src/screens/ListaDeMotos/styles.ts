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
import styled from "styled-components/native";
import theme from "../../styles/theme";

interface CardProps {
  backgroundColor?: string;
}

export const Container = styled.View`
    flex: 1;
`;

export const ContainerPaginaInicial = styled.View`
    flex: 1;
    padding: 10px;
    background-color: #FFF;
`;

export const ScrollPaginaInicial = styled.ScrollView.attrs(() => ({
    contentContainerStyle: { justifyContent: 'center', flexGrow: 1 }
}))``;

export const ContainerCardsPaginaInicial = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const ContainerBotoesPaginaInicial = styled.View`
    display: flex;
    flex-direction: column;
`;

export const ContainerCardPaginaInicial = styled.View`
    width: 100%;
    padding: 16px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: ${(props: CardProps) => props.backgroundColor || theme.colors.primary};
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

export const TituloCardPaginaInicial = styled.Text`
    font-size: 18px;
    color: #fff;
    font-family: ${theme.fonts.bold};
`;

export const QuantidadeCardPaginaInicial = styled.Text`
    font-size: 32px;
    color: #fff;
    font-family: ${theme.fonts.bold};
`;
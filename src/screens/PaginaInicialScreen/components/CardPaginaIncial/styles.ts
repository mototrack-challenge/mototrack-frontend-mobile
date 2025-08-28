import styled from "styled-components/native";
import theme from "../../../../styles/theme";

interface CardProps {
  backgroundColor?: string;
}

export const ContainerCardPaginaInicial = styled.View`
    width: 100%;
    padding: 16px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: ${(props: CardProps) => props.backgroundColor || theme.colors.primary};
    display: flex;
    flex-direction: column;
    gap: 5px;
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
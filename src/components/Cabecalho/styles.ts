import styled from "styled-components/native";
import theme from "../../styles/theme";

export const ContainerCabecalho = styled.View`
    padding: 40px 16px 30px 16px;
    padding-top: 40px;
    background-color: ${theme.colors.primary};
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

export const TituloCabecalho = styled.Text`
    font-size: 24px;
    color: #fff;
    padding-bottom: 10px;
    font-family: ${theme.fonts.bold};
    align-items: center;
`;

export const BotaoCabecalho = styled.TouchableOpacity`
    align-items: center;
`;

export const TextoBotaoCabecalho = styled.Text`
    color: #fff;
    text-decoration-line: underline;
    font-size: 14px;
    font-family: ${theme.fonts.regular};
`;
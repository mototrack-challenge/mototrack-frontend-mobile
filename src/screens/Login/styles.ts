import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 16px;
    background-color: ${theme.colors.background};
`;

export const Logo = styled.Image`
    align-self: center;
    margin-bottom: 20px;
`;

export const Titulo = styled.Text`
    font-size: 24px;
    margin-bottom: 10px;
    text-align: center;
    font-family: ${theme.fonts.bold};
`;

export const Subtitulo = styled.Text`
    font-size: 18px;
    color: ${theme.colors.secondary};
    margin-bottom: 24px;
    text-align: center;
    font-family: ${theme.fonts.regular};
`;

export const Input = styled.TextInput`
    background-color: #ECEFF1;
    border-color: gray;
    border-width: 1px;
    margin-bottom: 10px;
    padding: 6px 0 6px 6px;
    border-radius: 5px;
    font-family: ${theme.fonts.regular};
`;

export const MensagemErro = styled.Text`
    color: ${theme.colors.error};
    margin-bottom: 10px;
    text-align: center;
    font-family: ${theme.fonts.regular};
`;

export const MensagemSucesso = styled.Text`
    color: ${theme.colors.success};
    margin-bottom: 10px;
    text-align: center;
    font-family: ${theme.fonts.regular};
`;

export const BotaoEntrar = styled.TouchableOpacity`
    background-color: ${theme.colors.primary};
    padding-vertical: 12px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const TextoBotaoEntrar = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
    font-family: ${theme.fonts.bold};
`;

export const ContainerLink = styled.View`
    flex-direction: row;
    justify-content: center; 
    align-items: center;
    margin-top: 16px;
`;

export const TextoLink = styled.Text`
    margin-top: 16px;
    color: #000000;
    text-align: center;
    font-family: ${theme.fonts.regular};
`;

export const BotaoLink = styled.TouchableOpacity`
    justify-content: center;
`;

export const TextoBotaoLink = styled.Text`
    margin-top: 16px;
    color: ${theme.colors.primary};
    text-align: center;
    text-decoration-line: underline;
    font-family: ${theme.fonts.regular};
`;
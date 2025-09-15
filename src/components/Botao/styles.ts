import styled from "styled-components/native";
import theme from "../../styles/theme";

interface ComponenteBotaoProps {
  backgroundColor?: string;
}

export const ComponenteBotao = styled.TouchableOpacity<ComponenteBotaoProps>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: ${(props: ComponenteBotaoProps) => props.backgroundColor || theme.colors.primary};
    border-radius: 8px;
    margin-bottom: 7px;
`;

export const TextoBotao = styled.Text`
    font-size: 16px;
    color: #fff;
    font-family: ${theme.fonts.bold};
`;
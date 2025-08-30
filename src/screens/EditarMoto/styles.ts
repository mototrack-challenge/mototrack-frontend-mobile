import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.background};
`;

export const ContainerPaginaEditarMotos = styled.View`
    flex: 1;
    padding: 10px;
    background-color: #FFF;
`;

export const ScrollPaginaEditarMotos = styled.ScrollView.attrs(() => ({
    contentContainerStyle: { justifyContent: 'center', flexGrow: 1 }
}))``;

export const ContainerEditarMoto = styled.View`
    flex: 1;
    padding: 10px;
    background-color: #FFF;
`;

export const TituloEditarMoto = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    text-align: left;
    font-family: ${theme.fonts.bold};
`;

export const Label = styled.Text`
    font-size: 14px;
    margin-bottom: 5px;
    font-family: ${theme.fonts.regular};
`;

export const Input = styled.TextInput`
    background-color: #FAFAFA;
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

export const Botoes = styled.View`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
`;

export const ContainerDropDown = styled.View<{ zIndexValue?: number }>`
  position: relative;
  z-index: ${(props: { zIndexValue?: number }) => props.zIndexValue || 1};
  margin-bottom: 10px;
`;

export const DropDownInputStyle = {
  height: 40,
  backgroundColor: "#FAFAFA",
  borderColor: "gray",
  borderWidth: 1,
  borderRadius: 5,
  paddingLeft: 10,
};
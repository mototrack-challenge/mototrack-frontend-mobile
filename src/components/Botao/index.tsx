import { ComponenteBotao, TextoBotao } from "./styles";

interface CompomenteBotaoProps {
  titulo: string;
  onPress: () => void;
  backgroundColor?: string;
}

const Botao = ({ titulo, onPress, backgroundColor} : CompomenteBotaoProps) => {

    return(
        <ComponenteBotao onPress={onPress} backgroundColor={backgroundColor}>
            <TextoBotao>{titulo}</TextoBotao>
        </ComponenteBotao>
    );
}

export default Botao;
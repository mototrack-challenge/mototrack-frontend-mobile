import { ContainerCardPaginaInicial, QuantidadeCardPaginaInicial, TituloCardPaginaInicial } from "./styles";

interface CardProps {
  titulo: string;
  quantidade: number;
  backgroundColor: string;
}

const CardPaginaInicial = ({ titulo, quantidade, backgroundColor }: CardProps) => {

    return (
        <ContainerCardPaginaInicial backgroundColor={backgroundColor}>

            <TituloCardPaginaInicial>{titulo}</TituloCardPaginaInicial>

            <QuantidadeCardPaginaInicial>{quantidade}</QuantidadeCardPaginaInicial>

        </ContainerCardPaginaInicial>
    );
};

export default CardPaginaInicial;
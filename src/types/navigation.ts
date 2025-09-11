import { Moto, Movimentacao } from "./types";

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    PaginaInicial: undefined;
    ListaDeMotos: undefined;
    CadastroDeMoto: undefined;
    EditarMoto: { id_moto: number };
    Movimentacoes: { id_moto: number };
    CadastroDeMovimentacao: { id_moto: number };
    Alertas: { id_moto: number };
    CadastroDeAlerta: { id_moto: number };
    Colaboradores: undefined;
};
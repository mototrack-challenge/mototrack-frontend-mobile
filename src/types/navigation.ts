import { Moto, Movimentacao } from "./types";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    RegisterMoto: undefined;
    ListMotos: undefined;
    EditMoto: { id_moto: number };
    Movimentacoes: { id_moto: number };
    RegisterMovimentacao: { id_moto: number };
    Alertas: { id_moto: number };
    RegisterAlerta: { id_moto: number };
};
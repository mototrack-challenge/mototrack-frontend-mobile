import { Moto, Movimentacao } from "./types";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    RegisterMoto: undefined;
    ListMotos: undefined;
    EditMoto: { id_moto: number };
    Movimentacoes: { movimentacoes: Movimentacao[]}
    ChangeDepartamento: { moto: Moto };
};
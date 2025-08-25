import { Moto } from "./types";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    RegisterMoto: undefined;
    ListMotos: undefined;
    EditMoto: { moto: Moto };
    ChangeDepartamento: { moto: Moto };
};
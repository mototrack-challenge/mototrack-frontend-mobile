import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export interface UsuarioRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface UsuarioRequestLoginDTO {
  email: string;
  senha: string;
}

export async function login(usuario: UsuarioRequestLoginDTO) {
  try {
    const response = await api.post(
      "http://localhost:8080/auth/login",
      usuario
    );

    const data = response.data;
    AsyncStorage.setItem("token", data.token);

    const decoded: any = jwtDecode(data.token);
    const userId = decoded.id;
    AsyncStorage.setItem("userId", userId);

    return data.token;

  } catch (error) {
    console.error("Erro no login:", error);
    throw new Error("Login falhou! Verifique suas credenciais.");
  }
}

export const cadastrarUsuario = async (usuario: UsuarioRequestDTO) => {
  return await api.post("/usuarios", usuario);
};

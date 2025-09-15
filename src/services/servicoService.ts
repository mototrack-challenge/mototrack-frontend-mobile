import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5073/api",
});


export const buscarServicosPorMoto = async (idMoto: number) => {
  try {
    const response = await api.get(`/Servico/moto/${idMoto}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar os serviços da moto ${idMoto}:`, error);
    throw error;
  }
};
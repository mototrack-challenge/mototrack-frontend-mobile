import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5073/api",
});


export const buscarServicosPorMoto = async (idMoto: number) => {
  try {
    const response = await api.get(`/Servico/moto/${idMoto}`);
    
    if (response.data && !Array.isArray(response.data)) {
      console.warn(response.data.message || `Nenhum serviço encontrado para a moto ${idMoto}`);
      return [];
    }

    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar os serviços da moto ${idMoto}:`, error);
    throw error;
  }
};

export const deletarServico = async (id: number) => {
  try {
    const response = await api.delete(`/Servico/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar serviço com ID ${id}:`, error);
    throw error;
  }
}
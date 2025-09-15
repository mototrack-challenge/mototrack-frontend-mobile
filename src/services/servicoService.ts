import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5073/api",
});

export interface ServicoRequestDTO {
  descricao: string;
  status: string;
  motoId: number;
  colaboradorId: number;
}

export const cadastrarServico = async (servico: ServicoRequestDTO) => {
  try {
    const response = await api.post('/Servico', servico)
  }
  catch (error) {
    console.error('Erro ao cadastrar o serviço:', error);
    throw error;
  }
};

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

export const buscarServicoPorId = async (id: number) => {
  try {
    const response = await api.get(`/Servico/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar serviço com ID ${id}:`, error);
    throw error;
  }
};

export const editarServico = async (id: number, servico: ServicoRequestDTO) => {
  try {
    const response = await api.put(`/Servico/${id}`, servico);
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar serviço com ID ${id}:`, error);
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
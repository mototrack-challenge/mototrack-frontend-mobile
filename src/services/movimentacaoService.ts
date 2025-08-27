import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export interface MovimentacaoRequestDTO {
  moto_id: number;
  departamento_id: number;
}

export const cadastrarMovimentacao = async (moviementacao: MovimentacaoRequestDTO) => {
  try {
    const response = await api.post('/movimentacoes', moviementacao)
  }
  catch (error) {
    console.error('Erro ao cadastrar moviementação:', error);
    throw error;
  }
};

export const buscarMovimentacoesPorMoto = async (id: number) => {
  try {
    const response = await api.get(`/movimentacoes/moto/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar movimentações da moto com ID ${id}:`, error);
    throw error;
  }
}

export const deletarMovimentacao = async (id: number) => {
  try {
    const response = await api.delete(`/movimentacoes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar movimentação com ID ${id}:`, error);
    throw error;
  }
}
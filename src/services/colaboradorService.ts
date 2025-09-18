import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5073/api",
});

export interface ColaboradorRequestDTO {
  nome: string;
  matricula: string;
  email: string;
}

export const buscarColaboradores = async () => {
  try {
    const response = await api.get("/Colaborador", {
      params: { deslocamento: 0, registrosRetornados: 1000 },
    });
    return response.data?.data ?? [];
  } catch (error) {
    console.error("Erro ao buscar colaboradores:", error);
    throw error;
  }
};

export const buscarColaboradorPorId = async (id: number) => {
  try {
    const response = await api.get(`/Colaborador/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar colaborador com ID ${id}:`, error);
    throw error;
  }
};

export const cadastrarColaborador = async (colaborador: ColaboradorRequestDTO) => {
  try {
    const response = await api.post('/Colaborador', colaborador)
  }
  catch (error) {
    console.error('Erro ao cadastrar o colaborador:', error);
    throw error;
  }
};

export const editarColaborador = async (id: number, colaborador: ColaboradorRequestDTO) => {
  try {
    const response = await api.put(`/Colaborador/${id}`, colaborador);
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar colaborador com ID ${id}:`, error);
    throw error;
  }
};

export const deletarColaborador = async (id: number) => {
  try {
    const response = await api.delete(`/Colaborador/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar colaborador com ID ${id}:`, error);
    throw error;
  }
}
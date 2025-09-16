import api from "./apiJava";

export interface AlertaRequestDTO {
  gravidade: string;
  mensagem: string;
  moto_id: number;
}

export const cadastrarAlerta = async (alerta: AlertaRequestDTO) => {
  try {
    const response = await api.post('/alertas', alerta)
  }
  catch (error) {
    console.error('Erro ao cadastrar alerta:', error);
    throw error;
  }
};

export const buscarAlertasPorMoto = async (id: number) => {
  try {
    const response = await api.get(`/alertas/moto/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar alertas da moto com ID ${id}:`, error);
    throw error;
  }
}

export const deletarAlerta = async (id: number) => {
  try {
    const response = await api.delete(`/alertas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar alerta com ID ${id}:`, error);
    throw error;
  }
}

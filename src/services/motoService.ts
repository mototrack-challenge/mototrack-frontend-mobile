import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export interface MotoRequestDTO {
  placa: string;
  chassi: string;
  modelo: string;
  status: string;
}

export const buscarMotos = async () => {
  try {
    const response = await api.get('/motos');
    return response.data.content;
  }
  catch (error) {
    console.error('Erro ao buscar motos:', error);
    throw error;
  }
};

export const buscarMotoPorId = async (id: number) => {
  try {
    const response = await api.get(`/motos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar moto com ID ${id}:`, error);
    throw error;
  }
}

export const cadastrarMoto = async (moto: MotoRequestDTO) => {
  try {
    const response = await api.post('/motos', moto)
  }
  catch (error) {
    console.error('Erro ao cadastrar moto:', error);
    throw error;
  }
};

export const editarMoto = async (id: number, moto: MotoRequestDTO) => {
  try {
    const response = await api.put(`/motos/${id}`, moto);
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar moto com ID ${id}:`, error);
    throw error;
  }
};
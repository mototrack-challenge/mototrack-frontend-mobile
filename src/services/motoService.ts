import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

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
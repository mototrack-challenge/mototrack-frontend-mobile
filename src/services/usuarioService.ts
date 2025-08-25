import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export interface UsuarioRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

export const cadastrarUsuario = async (usuario: UsuarioRequestDTO) => {
    return await api.post('/usuarios', usuario)
}

export const buscarUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data.content;

  }
  catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};